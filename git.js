// Git commands in js

// commit command: git commit -m "msg"
class Commit {
  constructor(id, parent, message) {
    this.id = id;
    this.parent = parent;
    this.message = message;
  }
}

// the defualt branch is master
class Branch {
  constructor(name,commit) {
    this.name = name;
    this.commit = commit;
  }
}

// the main git command
class Git {
  constructor(name) {
    this.name = name; // Repo name
    this.lastCommitId = -1; // Keep track of last commit id.
    this.branches = []; // list of all branches

    let master = new Branch('master', null); // null is passed as we dont have any commits yet
    this.branches.push(master); // store master branch

    this.HEAD = master; // Reference to last Commit.
  }

  commit(message) {
    // Increment last commit id and pass into new commit.
    let commit = new Commit(++this.lastCommitId, this.HEAD, message);

    // Update HEAD and current branch.
    this.HEAD.commit = commit;

    return commit;
  }

  log() {
    // Start from HEAD
    var commit = this.HEAD.commit, history = [];

    while (commit) {
      history.push(commit);
      // Keep following the parent
      commit = commit.parent;
    }

    return history;
  }

  checkout(branchName) {
    // loop through all branches and see if we called branchName
    for (var i = this.branches.length; i--;) {
      console.log("Switched to existing branch: " + branchName);
      this.HEAD = this.branches[i];
      return this;
    }

    let newBranch = new Branch(branchName, this.HEAD.commit);
    this.branches.push(newBranch);
    this.HEAD = newBranch;

    console.log("Switched to new branch: " + branchName);
    return this;

  }
}

let repo = new Git('test');
repo.commit('Initial commit');
repo.commit('change 1');
console.log(repo); // show all the repo info

let log = repo.log();
console.log(log); // show the history of all repos