let words, life, start = false, i, item, word;

$('#start').click(init);

$('body').keyup(function(e){

    if(start){
        checkChar(e);
    }

});


function init(){
    words = [
        'catalizator',
        'temperament',
        'abecedar',
        'strict',
        'extraterestru',
        'spanzuratoare',
        'psihopat',
        'treisprezece',
        'Telenciclopedie'
    ];
    life = 4;
    word = [];

    if(!start){

        item = words[Math.floor(Math.random()*words.length)];

        wordMaker(item);


        $('.container #word').append("<ul class='list' >");
        for(i = 0; i < word.length; i++){
            $('.container #word ul').append("<li id='" + i + "' class='li'>" + word[i] + "</li>");
        }
        $('.container #word').append("</ul>");

        $('#life-container').show();
        $('#life-container #life').text(life+' Vieți rămase');

        $('#start').remove();
        $('#restart').remove();
        $('#word h3').remove();
        start = true;
    }

}

function checkChar(e){
    if(!checkValue(e.key, item)){
        life -= 1;
        checkLife(life);
    }else{
        for(i = 0; i < item.length; i++){
            if(e.key == item[i]){
                $('#'+i).text(item[i]);
                word[i] = e.key;
            }
        }
        countChar(word);
    }
}

function wordMaker(item){
    let last = item.length-1;
    for(i = 0; i < item.length; i++){
        if(i == 0){
            word.push(item[i])
        }else if(i == last){
            word.push(item[i]);
        }else{
            word.push('_');
        }
    }
}

function countChar(word){
    var char = 0;
    for(i = 0; i < word.length; i++){
        if(word[i] == '_'){
            char++;
        }
    }
    if(char == 0){
        endGame('AI CÂȘTIGAT!');
    }
}

function checkLife(life){
    if(life == 0){
        endGame('AI PIERDUT!');
        $('#life-container #life').text(life+' Vieți rămase. Jocul a luat sfârșit.');
    }else{
        $('#life-container #life').text(life+' Vieți rămase');

    }
}

function checkValue(key,word){
    let status = false;

    for(i=0; i<word.length; i++){
        if(word[i] == key){
            status = true;
            break;
        }
    }

    return status;
}

function endGame(label){
    $('.container #word ul').remove();
    $('.container #word').append("<h3>"+label+"</h3>");
    start = false;

    $('.row').append("<button id=\"restart\" class=\"btn btn-success\">Resetează jocul</button>");

    $('#restart').click(init);
}

function restartGame(){
    if(!start){
        init();
    }
}

