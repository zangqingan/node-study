const readline = require('node:readline')
const fs = require('fs')

// 命令行输入
// const r1 = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })
// r1.question('Please input a word: ', function(answer){
//     console.log('You have entered [%s]', answer.toUpperCase())
//     r1.close()
// })

// 日志逐行分析
// const r2 = readline.createInterface({
//     input: fs.createReadStream('../../public/logs/access.log')
// })
// r2.on('line', (line) => {
//     console.log('line',line)
// })

// 自动完成：代码提示
// function completer(line) {
//     const command = 'npm' 
//     const subCommands = ['help', 'init', 'install'] 
//     // 输入为空，或者为npm的一部分，则tab补全为npm
//     if(line.length < command.length){
//         return [command.indexOf(line) === 0 ? [command] : [], line] 
//     }
//     // 输入 npm，tab提示 help init install
//     // 输入 npm in，tab提示 init install
//     let hits = subCommands.filter(function(subCommand){ 
//         const lineTrippedCommand = line.replace(command, '').trim() 
//         return lineTrippedCommand && subCommand.indexOf( lineTrippedCommand ) === 0 
//     })
//     if(hits.length === 1){
//         hits = hits.map(function(hit){
//             return [command, hit].join(' ') 
//         }) 
//     }
//     return [hits.length ? hits : subCommands, line] 
// }
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   completer: completer
// }) 
// rl.prompt()

// 自定义命令行工具
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'OHAI> '
});

const preHint = `
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See \`npm help json\` for definitive documentation on these fields
and exactly what they do.

Use \`npm install <pkg> --save\` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
`;

console.log(preHint);

// 问题
let questions = [ 'name', 'version', 'author'];

// 默认答案
let defaultAnswers = [ 'name', '1.0.0', 'none' ];

// 用户答案
let answers = [];
let index = 0;

function createPackageJson(){
    var map = {};
    questions.forEach(function(question, index){
        map[question] = answers[index];
    });

    fs.writeFileSync('./package.json', JSON.stringify(map, null, 4));
}

function runQuestionLoop() {

    if(index === questions.length) {
        createPackageJson();
        rl.close();
        return;
    }
    
    let defaultAnswer = defaultAnswers[index];
    let question = questions[index] + ': (' + defaultAnswer +') ';
    
    rl.question(question, function(answer){
        answers.push(answer || defaultAnswer);
        index++;
        runQuestionLoop();
    });
}
runQuestionLoop();