var fs = require('fs');
var Files = function(path, fileUrl) {
    var _scope = this;
    this.path = path || __dirname;
    this.fileUrl = fileUrl || '/files/';
    console.log(this.path);
    this.files = [];

    function init() {
        _scope.getFiles();
    }

    this.getFiles = function() {
        fs.readdir(_scope.path, function(err, files) {
            if (err) throw err;
            for (var i = 0; i < files.length; i++) {
                var file = {
                    filename: files[i],
                    isFolder: isFolder(files[i]),
                    filepath: _scope.path + '/' + files[i]
                };
                _scope.files.push(file); 
            }
        });
    };


    
    function isFolder(filename) {
        return filename.indexOf('.') == -1;
    }

    init();
};

module.exports = Files;