var dirMap;

class File {
  size;
  name;

  constructor(size, name) {
    this.size = parseInt(size);
    this.name = name;
  }
}

class Directory {
  parent;
  name;
  size;
  files = [];
  dirs = [];

  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
  }

  addFile(file) {
    if (file.name) {
      this.files.push(file);
    }
  }

  addDir(dir) {
    if (dir.name) {
      this.dirs.push(dir);
    }
  }

  calculateSize() {
    this.size = this.findSize();
  }

  findSize() {
    let fileSizesSum;

    if (this.files.length == 0) {
      fileSizesSum = 0;
    } else {
      let fileSizes = this.files.map((file) => {
        return file.size;
      });

      fileSizesSum = fileSizes.reduce((total, subtotal) => {
        return total + subtotal;
      });
    }

    if (this.dirs.length == 0) {
      return fileSizesSum;
    } else {
      let dirSizes = this.dirs.map((dir) => {
        if (dir.size) {
          return dir.size;
        } else {
          dir.calculateSize();
          return dir.size;
        }
      });
      let dirSizesSum = dirSizes.reduce((total, subtotal) => {
        return total + subtotal;
      });
      return fileSizesSum + dirSizesSum;
    }
  }
}

function start() {
  let inputText = getInput();

  let blocks = getBlocks(inputText);
  let splitText = splitBlocks(blocks);
  reconstructTree(splitText);
  calculateAllSizes();

  let root = dirMap.get("/");
  let targetDirs = findChildDirsUnderSize(root, 100000);
  let targetDirsSum = sumDirSizes(targetDirs);

  displayResults(targetDirsSum);
}

function getBlocks(input) {
  return input.split("$ ");
}

function splitBlocks(blocks) {
  let splitBlocks = blocks.map((block) => {
    let splitPoint = block.indexOf("\n");
    let command = block.slice(0, splitPoint);
    let result = block.slice(splitPoint + 1);
    return [command, result];
  });

  return splitBlocks;
}

function reconstructTree(splitText) {
  var currentDir;
  dirMap = new Map();

  for (let block of splitText) {
    var command = block[0];
    var result = block[1];

    if (command.startsWith("cd")) {
      let dirName = command.split(" ")[1];
      currentDir = cd(dirName, currentDir);
    } else if (command.startsWith("ls")) {
      trackFilesInDir(result, currentDir);
    }
  }
}

function calculateAllSizes() {
  dirSizeArr = [];
  let root = dirMap.get("/");
  root.calculateSize();
}

function findChildDirsUnderSize(parent, size) {
  let targetDirs = [];
  if (parent.size <= size) {
    targetDirs.push(parent);
  }

  if (parent.dirs.length == 0) {
    return targetDirs;
  } else {
    for (let dir of parent.dirs) {
      targetDirs = targetDirs.concat(findChildDirsUnderSize(dir, size));
    }
  }

  return targetDirs;
}

function sumDirSizes(dirs) {
  let dirSizes = dirs.map((dir) => {
    return dir.size;
  });

  let sumSizes = dirSizes.reduce((total, subtotal) => {
    return total + subtotal;
  });

  return sumSizes;
}

function trackFilesInDir(fileList, currentDir) {
  fileList = fileList.split("\n");

  for (let line of fileList) {
    let splitLine = line.split(" ");

    if (line.startsWith("dir")) {
      let dirName = splitLine[1];
      let dir = new Directory(dirName, currentDir);
      currentDir.addDir(dir);
      dirMap.set(dirName, dir);
    } else {
      let fileSize = splitLine[0];
      let fileName = splitLine[1];
      let file = new File(fileSize, fileName);
      currentDir.addFile(file);
    }
  }
}

function cd(dirName, currentDir) {
  if (dirMap.has(dirName)) {
    return dirMap.get(dirName);
  } else if (dirName == "..") {
    return currentDir.parent;
  } else {
    let dir = new Directory(dirName, currentDir);
    dirMap.set(dirName, dir);
    return dir;
  }
}
