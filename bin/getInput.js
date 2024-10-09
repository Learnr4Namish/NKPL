

exports.question = function(q , cb ){

    var response;

    rl.setPrompt(q);
    rl.prompt();

    rl.on('line', (userInput) => {
        response = userInput;
        rl.close();
    });

    rl.on('close', () => {
        return cb(response);
    });
};