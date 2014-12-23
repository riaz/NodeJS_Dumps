#!/usr/bin/env node

var fs = require("fs");
var outfile = "firstnprime.txt";
var n = 100;
var arr = new Array();
var notPrime;

var idx = 2;
var i = 1;

while(i<=n)
{
	notPrime = false;
	for(var j = 2; j < idx; j++)
	{
		notPrime = false;
		if(idx%j == 0)
		{
			notPrime = true;
			break;
		}
	}
	if(notPrime == true)
		idx++;
	else
	{
		i++;		
		arr.push(idx);
		idx++;
	}
}

var out = arr.join(",");

fs.writeFileSync(outfile,out);
console.log("The file was successfully written");

