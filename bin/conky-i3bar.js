#!/home/alexander.weiher/.nvm/versions/node/v0.12.7/bin/node

var
  child_process = require('child_process'),
  fs = require('fs'),
  logFile = '/home/alexander.weiher/bin/tmp.log';

fs.writeFileSync(logFile, 'started ..');

console.log('{"version":1,"click_events":true}');
console.log('[');
console.log('[],');


// Now send blocks with information forever:
// exec conky -c $HOME/.conkyrc

var conky = child_process.spawn('conky', ['-c', '/home/alexander.weiher/.conkyrc']);

conky.stdout.on('data', function(data) {
//	fs.writeFileSync(logFile, 'stdout: ' + data);
	console.log(data.toString());
});

process.stdin.on('readable', function() {
	var chunk = process.stdin.read().toString().substr(1).trim();
	if(chunk !== null) {
		fs.writeFileSync(logFile, 'stdin: <' + chunk + '>');

		var json = JSON.parse(chunk);
        /*switch(json.name) {
			case "lock":
				fs.writeFileSync(logFile, "LOCK SCREEN!");
				break;
		}*/
		fs.writeFileSync(logFile, 'CLICK NAME: ' + JSON.stringify(json.name));

		if(json.name === "lock") {
			//var i3lock = child_process.spawn('i3lock');
      child_process.execFileSync("/usr/bin/i3lock");
		} else if(json.name === "idea") {
      child_process.execFileSync("/home/alexander.weiher/apps/idea-14.1.4/bin/idea.sh");
    }
	}
});
