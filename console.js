/**
 * console.js
 *
 * Part of the code come from https://github.com/elfet/deployer/blob/gh-pages/assets/lib/console.js
 * (c) Anton Medvedev <anton@elfet.ru>
 */

$(function () {
    var code = $('.shell');
    var console = $('.console');
    var input = $('input').focus();
    var form = $('form');
    
    var scroll = function () {
        code.scrollTop(code[0].scrollHeight);
    };
    var notFound;
    var delay = function (answer) {
        console.append(answer.shift());
        scroll();
        if (answer.length > 0) {
            setTimeout(function () {
                delay(answer);
            }, 1000);
        }
    };

    var to = function (command, need, answer) {
        if (need.indexOf(command) != -1) {
            if (Object.prototype.toString.call(answer) === '[object Array]') {
                delay(answer);
            } else {
                console.append(answer);
            }
            notFound = false;
        }
    };

    var delayInput = function (command) {
        input.val(input.val() + command.shift());
        if (command.length > 0) {
            setTimeout(function () {
                delayInput(command);
            }, 200);
        }
    };

    setTimeout(function () {
        delayInput('php phpoole.phar --help'.split(''));
    }, 1000);

    form.submit(function (event) {
        event.stopPropagation();

        var command = $.trim(input.val());
        if (command == '') {
            return false;
        }

        console.append('$ ' + command + '\n');

        notFound = true;

        to(command, ['help', '?', '/?'], 'This is an example of the shell to try PHPoole in your browser.\n' +
            'Try type the following commands and press enter:\n' +
            'php phpoole --help\n' +
            'php phpoole --init\n' +
            'php phpoole --generate');

        to(command, ['php phpoole.phar --help', 'php phpoole.phar -h'], 'Usage: phpoole.php [ options ]\n' +
            '--help|-h              Get PHPoole usage message\n' +
            '--init|-i [ \<string\> ] Build a new PHPoole website (\<force\>)\n' +
            '--generate|-g          Generate static files\n' +
            '--serve|-s             Start built-in web server\n' +
            '--deploy|-d            Deploy static files\n' +
            '--list|-l              Lists content\n');

        if (notFound) {
            console.append('Sorry but this command can not be run in the emulator.\n');
        }

        scroll();
        input.val('');

        return false;
    });

    $(document).keydown(function (event) {
        if (!event.ctrlKey && !event.altKey && !event.metaKey) {
            input.focus();
        }
    });
});