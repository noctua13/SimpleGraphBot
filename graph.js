// init project
const http = require('http');
const express = require('express');
const app = express();
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

client.on("ready", () => {
  console.log("I am ready!");
  client.user.setActivity('with Graphs and Matrices');
});

//global functions
function visit(a,i,n,visited,nComponent) {
    //a = matrix; i = edge; n = no. of edges;
    visited[i] = nComponent;
    for (var j = 0; j<n; j++) {
            if ( (visited[j] === 0) && (a[i][j] !== 0) ) {visit(a,j,n,visited,nComponent);}
    }
}


function isDirected(a, edges) {
for (var i = 0; i< edges; i++)
  for (var j = i; j < edges; j++) if (a[i][j] !== a[j][i]) return true;

return false;
}

var test1 = "6\n0 1 1 0 0 0\n1 0 1 1 1 0\n1 1 0 1 1 0\n0 1 1 0 1 1\n0 1 1 1 0 1\n0 0 0 1 1 0";
var test2 = "5\n0 1 1 0 0\n1 0 1 1 1\n1 1 0 1 1\n0 1 1 0 1\n0 1 1 1 0";
var test3 = "4\n0 0 0 0\n0 0 1 1\n0 1 0 1\n0 1 1 0";
var test4 = "6\n0 0 0 0 1 1\n0 0 1 1 0 0\n0 1 0 1 0 0\n0 1 1 0 0 0\n1 0 0 0 0 1\n1 0 0 0 1 0";
var test5 = "8\n0 0 0 0 0 0 1 1\n0 0 1 0 1 0 0 0\n0 1 0 0 0 0 0 1\n0 0 0 0 0 1 0 0\n0 1 0 0 0 0 1 0\n0 0 0 1 0 0 0 0\n1 0 0 0 1 0 0 0\n1 0 1 0 0 0 0 0";
var test6 = "8\n0 1 1 0 0 0 0 0\n1 0 0 1 0 0 0 0\n1 0 0 1 0 0 0 0\n0 1 1 0 1 1 0 0\n0 0 0 1 0 0 1 0\n0 0 0 1 0 0 0 1\n0 0 0 0 1 0 0 1\n0 0 0 0 0 1 1 0";
var test7 = "8\n0 1 0 0 0 0 0 0\n1 0 0 1 0 0 0 0\n0 0 0 1 0 0 0 0\n0 1 1 0 1 1 0 0\n0 0 0 1 0 0 1 0\n0 0 0 1 0 0 0 1\n0 0 0 0 1 0 0 1\n0 0 0 0 0 1 1 0";
var test8 = "4\n0 2 0 4\n2 0 3 1\n0 3 0 2\n4 1 2 0";
var test9 = "6\n0 2 0 4 5 0\n2 0 3 8 0 4\n0 3 0 7 0 1\n4 8 7 0 1 0\n5 0 0 1 0 0\n0 4 1 0 0 0";
var test10 = "4\n0 2 0 3\n2 0 0 6\n0 0 0 2\n3 6 2 0";
var test11 = "5\n0 2 0 3 0\n2 0 0 6 0\n0 0 0 2 0\n3 6 2 0 0\n0 0 0 0 0";

//main part
client.on("message", (message) => {

const args = message.content.slice(config.prefix.length).trim().replace( /\n/g, " " ).split(/ +/g);
const command = args.shift().toLowerCase();
  
if (message.isMentioned(client.user)) {message.channel.send('My prefix is `g!`, use the `help` command for more info.');}
  
if (message.author.bot || (message.channel.type === "dm")) {return;}
if (message.content.indexOf(config.prefix) !== 0) {return;}  

if (command === "read") {
    
        if (isNaN(args[0])) {message.react('❌'); return;}
        var edges = parseInt(args[0]);
        if ( args.length !== (edges*edges+1) ) {message.react('❌'); return;}
        //create matrix
        if (edges < 2) {message.react('❌'); return;}
        var a = new Array(edges);
        for (var i = 0; i < edges; i++) {
        a[i] = new Array(edges);
        }
        //read matrix
        var result = ''; var count = 1; var nComponent = 0; var visited = [];
for (var i = 0; i < edges; i++) {
  visited.push(0);
    for (var j = 0; j < edges; j++) {
    if (isNaN(args[count])) {message.react('❌'); return;}
            a[i][j] = parseInt(args[count]); count++;
    }
if(a[i][i] % 2 !== 0) {message.react('❌'); return;}
}  
        

//checking type of graph
if (isDirected(a,edges)) {message.react('❗'); return;}
//checking for connected components
//main function is global
//processing...
for (var i = 0; i< edges; i++) {
if (visited[i] === 0) {
    nComponent++;
    visit(a, i, edges, visited, nComponent);
    }
}
    //output connected components
var ConnectedComponentOutput = `__Connected Component(s)__: ${nComponent}\n`;
if (nComponent !== 1) {
for (var i = 0; i< nComponent; i++) {
    ConnectedComponentOutput += `\t• Part ${i+1}:\t`;
    for (var j = 0; j< edges; j++) {
        if (visited[j] === i+1) {ConnectedComponentOutput += `${j}   `};
    }
    ConnectedComponentOutput += `\n`;
}
    }
result += `${ConnectedComponentOutput}`;
        //output matrix
         message.channel.send(`${result}`); 
    } else
//------------------------------------------------------------------------------------------------//
if (command === "check") {
//args[0] === no. of edges; args[1] === start; args[2] === end;
    if (isNaN(args[0]) || isNaN(args[1]) || isNaN(args[2])) {message.react('❌'); return;}
    var edges = parseInt(args[0]); var startpoint = parseInt(args[1]); var endpoint = parseInt(args[2]);
    if ( args.length !== (edges*edges+3) ) {message.react('❌'); return;}
        //create matrix
    if (edges < 2) {message.react('❌'); return;}
    var a = new Array(edges);
    for (var i = 0; i < edges; i++) {
    a[i] = new Array(edges);
    }

        //read matrix
        var result = ''; var count = 3; var visited = []; var luuvet = [];
for (var i = 0; i < edges; i++) {
    visited.push(0); luuvet.push(-1);
    for (var j = 0; j < edges; j++) {
if (isNaN(args[count])) {message.react('❌'); return;}
            a[i][j] = parseInt(args[count]); count++;
    //if (a[i][j] !== a[j][i]) {message.channel.send('Input adjacency matrix is of a Directed Graph!'); return;}
            //result += `${a[i][j]} `;
    }
if(a[i][i] % 2 !== 0) {message.react('❌'); return;}
//result += `\n`;
}
var DFSresult = '__DFS__:\t';
//Depth First Search function
function DFS (s,a,edges,visited,luuvet) {
    visited[s] = 1;
    for (var i = 0; i< edges; i++) {
        if ( (visited[i] === 0) && (a[s][i] !== 0) ) {
            luuvet[i] = s;
            DFS(i,a,edges,visited,luuvet);
        }
    }
}
//DFS main process
DFS(startpoint,a,edges,visited,luuvet);
if (visited[endpoint] === 1) {
    var j = endpoint;
    while (j !== startpoint) {
        DFSresult += `${j} ← `;
        j = luuvet[j];
    }
    DFSresult += `${startpoint}\n`;
} else {DFSresult += 'No possible way.\n';}
result += DFSresult;
                    //----------------------------------------------------//
//RESET STUFF TO DO BFS
for (var i = 0; i < edges; i++) {
    visited[i] = 0; luuvet[i] = -1;
}
//Bread First Search
    //Queqe functions
     //function create

//BFS function
var BFSresult = '__BFS__:\t';
function BFS(s,a,edges,visited,luuvet) {
    var QUEUE = [];
    QUEUE.push(s);
    while (!(QUEUE.length === 0)) {
        var ss = QUEUE[0]; QUEUE.shift();
        visited[ss] = 1;
        for (var i = 0; i<edges; i++) {
            if ((visited[i] === 0) && (a[ss][i] !== 0)) {
                QUEUE.push(i);
                luuvet[i] = ss;
            }
        }
    }
}
//main process
BFS(startpoint,a,edges,visited,luuvet);
if (visited[endpoint] === 1) {
    var j = endpoint;
    while (j !== startpoint) {
        BFSresult += `${j} ← `;
        j = luuvet[j];
    }
    BFSresult += `${startpoint}`;
} else {BFSresult += 'No possible way.';}
result += BFSresult;
    //OUTPUT
message.channel.send(`${result}`);
} else 
//----------------------------------------------------------------------------------------------//
if ( command === "spanning" ) {
//read graph
if (isNaN(args[0])) {message.react('❌'); return;}
        var edges = parseInt(args[0]);
        if ( args.length !== (edges*edges+1) ) {message.react('❌'); return;}
        //create matrix
        if (edges < 2) {message.react('❌'); return;}
        var a = new Array(edges);
        for (var i = 0; i < edges; i++) {
        a[i] = new Array(edges);
        }
        //read matrix
        var count = 1; var visited = [];
/* CANH struct */
var u = []; var v = []; var trongso = []; var nComponent = 0; var visited2 = [];
/* CANH struct */
for (var i = 0; i < edges; i++) {
    visited.push(0); u.push(0); v.push(0); trongso.push(0); visited2.push(0);
    for (var j = 0; j < edges; j++) {
if (isNaN(args[count])) {message.react('❌'); return;}
            a[i][j] = parseInt(args[count]); count++;
    }
if(a[i][i] > 0) {message.react('❌'); return;}

}
  
for (var i = 0; i< edges; i++) {
if (visited2[i] === 0) {
    nComponent++;
    visit(a, i, edges, visited2, nComponent);
    }
}
if (nComponent !== 1) {message.channel.send('Input graph has more than 1 connected components!'); return;}

if (isDirected(a,edges)) {message.channel.send('Input graph is directed!'); return;}
  
u.pop(); v.pop(); trongso.pop();
//processing
    var nT = 0;
    visited[0] = 1;
    while (nT < edges - 1) {
        var uMIN = 0; var vMIN = 0; var trongsoMIN = 0;
        var min = -1;
        for (var i = 0; i<edges; i++) if (visited[i] === 0) {
            for (var j = 0; j < edges; j++) if (visited[j] === 1 && a[i][j] !== 0) {
                if (min === -1 || a[i][j] < min) {
                    min = a[i][j];
                    uMIN = i;
                    vMIN = j;
                    trongsoMIN = a[i][j];
                }
            }
        }
        u[nT] = uMIN;
        v[nT] = vMIN;
        trongso[nT] = trongsoMIN;
        nT++;
        visited[uMIN] = 1;
    }
//result
var sum = 0;
var result = '';
result += "Minimun Spanning Tree Result (Prim):\n";
for (var i = 0; i < nT; i++) {
    result += `(${u[i]}, ${v[i]}) `;
    sum += trongso[i];
}
result += `\nTotal weight: ${sum}`;
message.channel.send(`${result}`);
} else
//-----------------------------------------------------------------------------------------------//
if (command === "cycle") {
//read graph
if (isNaN(args[0])) {message.react('❌'); return;}
        var edges = parseInt(args[0]);
        if ( args.length !== (edges*edges+1) ) {message.react('❌'); return;}
        //create matrix
        if (edges < 2) {message.react('❌'); return;}
        var a = new Array(edges);
        for (var i = 0; i < edges; i++) {
        a[i] = new Array(edges);
        }
//read matrix
        var count = 1; var visited = []; var path = []; var deg = []; var sum = 0;
for (var i = 0; i < edges; i++) {
    visited.push(0); path.push(-1); deg.push(0);
    for (var j = 0; j < edges; j++) {
if (isNaN(args[count])) {message.react('❌'); return;}
            a[i][j] = parseInt(args[count]); count++;
            deg[i] += a[i][j]; sum += a[i][j];
    }
if(a[i][i] > 0) {message.react('❌'); return;}
}
    sum = sum/2;
//revision 1: not possible
//revision 2
visited[0] = 1; path[0] = 0; var cycle_count = 0;
//Euler Cycle
var result = 'Possible Euler Cycle.';
for (var i = 0; i < edges; i++) {
    if (deg[i] % 2 !== 0) {result = 'Not possible Euler Cycle.';}
}
if (sum === 0) {result = 'Not possible Euler Cycle.';}
//Hamilton Cycle
function show(path, edges) {
    var ret = '';
    
    for (var i = 0; i < edges; i++) {
        ret += `${path[i]}\t`;
    }
    ret += `${path[0]}`;
    ret += '\n';
    return ret;
}
function Hamilton(j, a, edges, visited, path, result) {
    for (var k = 0; k < edges; k++) 
        if (visited[k] === 0 && a[path[j-1]][k] !== 0) {
            visited[k] = 1; path[j] = k;
            if (j === edges - 1) {
                if (a[path[j]][path[0]] !== 0) {message.channel.send(`Hamilton Cycle found: ${show(path,edges)}`); return;}
            }
            else Hamilton(j+1, a, edges, visited, path, result);
            visited[k] = 0;
        }
}
//main process
Hamilton(1, a, edges, visited, path, result);
message.channel.send(`${result}`);
} else
//====================================================================================================================
  if (command === "hamilton") {
    
  if (isNaN(args[0])) {message.react('❌'); return;}
        var edges = parseInt(args[0]);
        if ( args.length !== (edges*edges+1) ) {message.react('❌'); return;}
        //create matrix
        if (edges < 2) {message.react('❌'); return;}
        var a = new Array(edges);
        for (var i = 0; i < edges; i++) {
        a[i] = new Array(edges);
        }
//read matrix
        var count = 1; var visited = []; var path = []; var deg = []; var sum = 0;
for (var i = 0; i < edges; i++) {
    visited.push(0); path.push(-1); deg.push(0);
    for (var j = 0; j < edges; j++) {
if (isNaN(args[count])) {message.react('❌'); return;}
            a[i][j] = parseInt(args[count]); count++;
            deg[i] += a[i][j]; sum += a[i][j];
    }
if(a[i][i] > 0) {message.react('❌'); return;}
}
    sum = sum/2;
//revision 1: not possible
//revision 2
visited[0] = 1; path[0] = 0; var cycle_count = 0;

//Hamilton Cycle
function show(path, edges) {
    var ret = '';
    
    for (var i = 0; i < edges; i++) {
        ret += `${path[i]}\t`;
    }
    ret += `${path[0]}`;
    ret += '\n';
    return ret;
}
function Hamilton(j, a, edges, visited, path, result) {
    for (var k = 0; k < edges; k++) 
        if (visited[k] === 0 && a[path[j-1]][k] !== 0) {
            visited[k] = 1; path[j] = k;
            if (j === edges - 1) {
                if (a[path[j]][path[0]] !== 0) {message.channel.send(`Hamilton Cycle found: ${show(path,edges)}`); }
            }
            else Hamilton(j+1, a, edges, visited, path, result);
            visited[k] = 0;
        }
}
//main process
message.channel.send(`<Begin analyzing>\n`);
Hamilton(1, a, edges, visited, path, result);
message.channel.send("<End process>");
  
}
//=====================================================================================================
  else
  if (command === "dijkstra") {
  
  //args[0] === no. of edges; args[1] === start; args[2] === end;
    if (isNaN(args[0]) || isNaN(args[1]) || isNaN(args[2])) {message.react('❌'); return;}
    var edges = parseInt(args[0]); var startpoint = parseInt(args[1]); var endpoint = parseInt(args[2]);
    if ( args.length !== (edges*edges+3) ) {message.react('❌'); return;}
        //create matrix
    if (edges < 2) {message.react('❌'); return;}
    var a = new Array(edges);
    for (var i = 0; i < edges; i++) {
    a[i] = new Array(edges);
    }
        //read matrix
        var count = 3; var thuocT = []; var length = []; var lastV = []; var nComponent = 0; var visited = [];
for (var i = 0; i < edges; i++) {
    thuocT.push(true); length.push(-1); lastV.push(-1); visited.push(0);
    for (var j = 0; j < edges; j++) {
if (isNaN(args[count])) {message.react('❌'); return;}
            a[i][j] = parseInt(args[count]); count++; 
            if (a[i][j] < 0) {message.react('❌'); return;}
    }
if(a[i][i] % 2 !== 0) {message.react('❌'); return;}
}

for (var i = 0; i< edges; i++) {
if (visited[i] === 0) {
    nComponent++;
    visit(a, i, edges, visited, nComponent);
    }
}
if (nComponent !== 1) {message.react('❗'); return;}
    
length[startpoint] = 0;
thuocT[startpoint] = false;
lastV[startpoint] = startpoint;
 
var v = startpoint; var t = startpoint;

while (thuocT[endpoint]) {
  for (var k = 0; k <edges; k++) {
    if (a[v][k] !== 0 && thuocT[k] === true && (length[k] === -1 || length[k] > length[v] + a[v][k]) ) {
         length[k] = length[v] + a[v][k];
         lastV[k] = v;
     }
  }
  v = -1;
  for (var i = 0; i< edges; i++) {
      if (thuocT[i] === true && length[i] !== -1)
        if (v === -1 || length[v] > length[i]) v = i;
  }
  thuocT[v] = false;
}
if (length[endpoint] === -1) {message.react('❗'); return;}
//output
var result = '';
var duongdi = [];
var v = endpoint; var id = 0;
    
while (v !== startpoint) {
    duongdi[id] = v;
    v = lastV[v];
    id++;
}
duongdi[id] = startpoint;
for (var i = id; i> 0; i--) {result += `${duongdi[i]} -> `;}
result += `${duongdi[i]}\n`;
result += `Total Weight: ${length[endpoint]}`;
message.channel.send(`${result}`);
  }
//================================================================================================
else 
if (command === "matrix2list") {
        if (isNaN(args[0])) {message.react('❌'); return;}
        var edges = parseInt(args[0]); var type = args[1];
        if ( args.length !== (edges*edges+2) ) {message.react('❌'); return;}
        //create matrix
        if (edges < 2) {message.react('❌'); return;}
        var a = new Array(edges);
        for (var i = 0; i < edges; i++) {
        a[i] = new Array(edges);
        }
        //read matrix
        var result = ''; var count = 2; var isdirected = false;
for (var i = 0; i < edges; i++) {
    for (var j = 0; j < edges; j++) {
    if (isNaN(args[count])) {message.react('❌'); return;}
            a[i][j] = parseInt(args[count]); count++;
    }
if(a[i][i] % 2 !== 0) {message.react('❌'); return;}
}

if (type === "adjacency") {
for (var i = 0; i < edges; i++) 
  for (var j = i; j < edges; j++) {
    if (a[i][j] !== 0) {result += `{${i};${j}}\n`;}
    if (a[j][i] !== a[i][j]) {result += `{${j};${i}}\n`; isdirected = true;}
}
} else if (type === "weight") {
for (var i = 0; i < edges; i++) 
  for (var j = i; j < edges; j++) {
    if (a[i][j] !== 0) {result += `{${i};${j}} ${a[i][j]}\n`;}
    if (a[j][i] !== a[i][j]) {result += `{${j};${i}} ${a[i][j]}\n`; isdirected = true;}
} 
} else {message.react('❌'); return;}
  
if (isdirected) {result += `Type: Directed Graph`;} else result += `Type: Indirected Graph`;
message.channel.send(`${result}`);
}
//==================================================================================================

else
if (command === "list2adjacency") {
if (isNaN(args[0])) {message.react('❌'); return;}
if (args.length % 2 !== 0) {message.react('❌'); return;}
var edges = parseInt(args[0]); var type = args[1];
//create matrix
if (edges < 2) {message.react('❌'); return;}
        var a = new Array(edges);
        for (var i = 0; i < edges; i++) {
        a[i] = new Array(edges);
        }

for (var i = 0; i< edges; i++) for (var j = 0; j < edges; j++) a[i][j] = 0;
if (type === "directed") {
  for (var count = 2; count < args.length; count+=2) {
  if (isNaN(args[count]) || isNaN(args[count + 1])) {message.react('❌'); return;}
  a[args[count]][args[count + 1]]++;
} 
} 
else if (type === "indirected") {
  for (var count = 2; count < args.length; count+=2) {
  if (isNaN(args[count]) || isNaN(args[count + 1])) {message.react('❌'); return;}
  a[args[count]][args[count + 1]]++; a[args[count + 1]][args[count]]++;
} 
} else {message.react('❌'); return;}
var result = '';

for (var i = 0; i < edges; i++) {
  for (var j = 0; j<edges; j++) result += `${a[i][j]} `;
  result += '\n';
}
message.channel.send(`${result}`);

}

else 
if (command === "list2weight") {
if (isNaN(args[0])) {message.react('❌'); return;}
if ((args.length +1) % 3 !== 0) {message.react('❌'); return;}
var edges = parseInt(args[0]); var type = args[1];
//create matrix
if (edges < 2) {message.react('❌'); return;}
        var a = new Array(edges);
        for (var i = 0; i < edges; i++) {
        a[i] = new Array(edges);
        }

for (var i = 0; i< edges; i++) for (var j = 0; j < edges; j++) a[i][j] = 0;
if (type === "directed") {
  for (var count = 2; count < args.length; count+=3) {
  if (isNaN(args[count]) || isNaN(args[count + 1]) || isNaN(args[count + 2])) {message.react('❌'); return;}
  a[args[count]][args[count + 1]] = parseInt(args[count + 2]);
} 
} 
else if (type === "indirected") {
  for (var count = 2; count < args.length; count+=3) {
  if (isNaN(args[count]) || isNaN(args[count + 1]) || isNaN(args[count + 2])) {message.react('❌'); return;}
  a[args[count]][args[count + 1]] = parseInt(args[count + 2]); 
  a[args[count + 1]][args[count]] = parseInt(args[count + 2]);
} 
} else {message.react('❌'); return;}
var result = '';

for (var i = 0; i < edges; i++) {
  for (var j = 0; j<edges; j++) result += `${a[i][j]} `;
  result += '\n';
}
message.channel.send(`${result}`);
}

      else
//===============================================================================================//
//-----------------------------------------------------------------------------------------------//
  if (command === "test") {
if (isNaN(args[0])) {message.react('❌'); return;}
var value = parseInt(args[0]);
switch (value) {
case 1: message.channel.send(`${test1}`); break;
case 2: message.channel.send(`${test2}`); break;
case 3: message.channel.send(`${test3}`); break;
case 4: message.channel.send(`${test4}`); break;
case 5: message.channel.send(`${test5}`); break;
case 6: message.channel.send(`${test6}`); break;
case 7: message.channel.send(`${test7}`); break;
case 8: message.channel.send(`${test8}`); break;
case 9: message.channel.send(`${test9}`); break;
case 10: message.channel.send(`${test10}`); break;
case 11: message.channel.send(`${test11}`); break;
default: message.react('❌'); break;
}
  }
  else
  
//-----------------------------------------------------------------------------------------------//
if (command === "help") {
    var help = '__Command List:__ (*prefix: g!*)\n\n'
      + '\t\t__Analyzing__:\n\n'
    + '\t• **read** `<no. of edges> <adjacency matrix>`\n'
    + '\t• **check** `<no. of edges> <starting point> <end point> <adjacency matrix>`\n'
    + '\t• **spanning** `<no. of edges> <adjacency matrix>`\n'
    + '\t• **cycle** `<no. of edges> <adjacency matrix>`\n'
    + '\t• **hamilton** `<no. of edges> <adjacency matrix>`\n'
    + '\t• **dijkstra** `<no. of edges> <starting point> <end point> <adjacency matrix>`\n\n'
      + '\t\t__Converting__:\n\n'
    + '\t• **matrix2list** `<no. of edges> adjacency/weight <matrix>`\n'
    + '\t• **list2adjacency** `<no. of edges> indirected/directed <list: i o>`\n'
    + '\t• **list2weight** `<no. of edges> indirected/directed <list: i o w>`'
    ;
    message.channel.send(`${help}`);
} 
      else
{
    message.channel.send('Unknown command. Use the `help` command for more details.');
}
  
});

client.login(process.env.TOKEN);