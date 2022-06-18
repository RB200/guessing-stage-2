let words = [
    {
        'letters': 6,
        'category': 'Foods',
        'word': 'orange'
    },
    {
        'letters': 7,
        'category': 'Animals',
        'word': 'dolphin'
    }
]

let alphabet = 
['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
$(document).ready(function(){
    getTemplates()
})

function getTemplates(){
    $.ajax({
        url:'/get-template',
        type:'get',
        success: ((result)=>{
            fillBlanks(result.word)
        }),
        error: ((result)=>{
            alert(result.responseJSON.message)
        })
    })
}
/*function getWord(){
    var random_number = parseInt(Math.random() * words.length)
    randWord = words[random_number]
    
}*/

// creating the letter buttons
var main = document.querySelector('#main-div')
for(var letter of alphabet){
    var button = document.createElement('button')
    $(button).attr('id',letter)
    $(button).attr('class','letter')
    $(button).html(letter)
    $(main).append(button)
}



function fillBlanks(){
    
    //getWord()
    const randWord = words[Math.floor(Math.random() * words.length)]
    $("#blank").empty();
    console.log(randWord)
    
    var inner_blanks = document.querySelector('.inner_blanks')
    for(var i=0;i<randWord.word.length;i++){
        var spans = document.createElement('span')
        $(spans).attr('class','blanks')
        $(spans).attr('id',`input_${i}`)
        $(spans).html('_')
        $(inner_blanks).append(spans)
    }
    $('#category-text').html(randWord.category)
    var gameOver = false

    $('.letter').click(function(){
        var correctGuess = false
        let id = $(this).attr('id')
        var life = parseInt($('#life-count').text())
        for(var i = 0; i < randWord.word.length; i++){
            if(randWord.word.charAt(i).toLowerCase() === id.toLowerCase()){
                if(life > 0 && ($('.blanks').eq(i).html() === '_' || $('.blanks').eq(i).html() === id)){
                    $('.blanks').eq(i).html(id)
                    correctGuess = true
                    if($('.inner_blanks').text() === randWord.word.toLowerCase()){
                        $('#result').text('You win!')
                        correctGuess = true
                        gameOver = true
                    }
                }

                
            }
        }
        if(life > 0 && correctGuess != true && gameOver != true){
            life = life-1
            $('#life-count').text(life)
        } 
        else if(life === 0){
            $('#result').text('You lost.')
        }
    })
}


