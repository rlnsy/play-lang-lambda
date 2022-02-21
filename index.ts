import * as childProcess from 'child_process';

function isString (s: unknown): s is string {
	return typeof s == 'string';
}

function isStringArray (a: unknown): a is Array<string> {
	try {
		return (a as Array<unknown>).every(element => isString(element));
	} catch (e) {
		return false;
	}
}

export async function handler (input: unknown = undefined) {
	if (!isStringArray(input)) {
		return Promise.reject(`Input ${input} is not an array of strings`);
	}
	return new Promise((resolve, reject) => {
		const output: Array<string> = [];
		const cp = childProcess.spawn("./play-lang/parser");
            	cp.stderr.on('data', data => console.error(data.toString()));
		cp.stdout.on('data', data => {
			data.toString().split("\n").filter((l: string) => l.length > 0).forEach((line: string) => 
                		output.push(line));
            	});
            	cp.on('close', status => {
                	if (!status) {
				if (output.length < input.length) {					reject(`Bad number of outputs: ${output.length}. Expected at least ${input.length}`);
				}
                    		resolve(output);
                	} else {
                    		reject(`Child process exited with code ${status}`);
                	}
            	});
		input.forEach(line => cp.stdin.write(`${line}\n`));
		cp.stdin.end();
	});
}
