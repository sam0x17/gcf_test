const fs = require('fs');
const child_process = require('child_process');
var proc = child_process.spawn('./gcf_test');

proc.stdout.on('data', function(data) {
  var lines = data.toString().trim().split('\n');
  lines.forEach(function(line) {
    if(line.startsWith("info: ")) {
      console.log(line.substring(6));
    } else if(line.startsWith("warn: ")) {
      console.warn(line.substring(6));
    } else if(line.startsWith("error: ")) {
      console.error(line.substring(7));
    } else {
      throw 'invalid console type: ' + line
    }
  });
});

proc.on('exit', function (code) {
  console.log('crystal function exited with code ' + code.toString());
  if(!fs.existsSync('/tmp/.gcf_status')) throw 'missing status code';
  var status = parseInt(fs.readFileSync('/tmp/.gcf_status').toString());
  if(fs.existsSync('/tmp/.gcf_text_output')) {
    var output = fs.readFileSync('/tmp/.gcf_text_output').toString();
    console.log('text output:', output);
  } else if(fs.existsSync('/tmp/.gcf_file_output')) {
    var path = fs.readFileSync('/tmp/.gcf_file_output').toString().trim();
    var data = fs.readFileSync(path);
    console.log('file output:', data);
  } else if(fs.existsSync('/tmp/.gcf_exception')) {
      var exception = fs.readFileSync('/tmp/.gcf_exception').toString().trim();
      console.error(exception);
      // send 500
  } else if(fs.existsSync('/tmp/.gcf_redirect_url')) {
    var url = fs.readFileSync('/tmp/.gcf_redirect_url').toString().trim();
    console.log('redirect:', url);
  } else {
    throw 'invalid state -- no text output, file output, redirect, or exception specified';
  }
});
