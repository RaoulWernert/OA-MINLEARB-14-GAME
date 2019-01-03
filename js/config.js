const onPlayClicked = function (){
    location.href = 'game.html';
}
const onConfigClicked = function (){
    toggleFields(true);
}
const toggleFields = function (isConfig) {
    $('#menu').toggle(!isConfig);
    $('#config').toggle(isConfig);
}
const toggleQuestionFields = function (type) {
    $('#mcContainer').toggle(type === 'mc');
    $('#oqContainer').toggle(type === 'oq');
}


let MC_numQuestions = 1;
let OQ_numQuestions = 1;
const addMC_Question = function () {
    MC_numQuestions++;
    let tr = '<tr id=MC-question'+MC_numQuestions+'></tr>';
    for(let i = 0; i < 5; i++){
        let td = '<td><input style="width: 95%" id="MC-'+MC_numQuestions+'-'+i+'"></td>';
        tr = $(tr).append(td);
    }
    let removeButton = '<td><button onclick="MC_RemoveQuestion('+MC_numQuestions+')">X</button></td>';
    tr = $(tr).append(removeButton);
    $('#MC-table').append(tr);
}
const MC_RemoveQuestion = function(index){
    $('#MC-question'+index).remove();
    if(index == MC_numQuestions){
        MC_numQuestions--;
    }
}

const addOQ_Question = function(){
    OQ_numQuestions++;
    let tr = '<tr id=OQ-question'+OQ_numQuestions+'></tr>';
    let question = '<td><input style="width: 95%" id="OQ-q-'+OQ_numQuestions+'"></td>';
    let answer = '<td><input style="width: 95%" id="OQ-a-'+OQ_numQuestions+'"></td>';
    let removeButton = '<td><button onclick="OQ_RemoveQuestion('+OQ_numQuestions+')">X</button></td>';
    tr = $(tr).append(question, answer, removeButton);
    $('#OQ-table').append(tr);
}

const onExportClicked = function(){
    let mcQuestions = [];
    let oqQuestions = [];
    for(let i = 1; i <= MC_numQuestions; i++){
        let obj = {};
        if($('#MC-'+i+'-0').length === 0){
            continue;
        }
        obj.question = $('#MC-'+i+'-0').val();
        obj.answer = $('#MC-'+i+'-1').val();
        obj.wrong1 = $('#MC-'+i+'-2').val();
        obj.wrong2 = $('#MC-'+i+'-3').val();
        obj.wrong3 = $('#MC-'+i+'-4').val();
        mcQuestions.push(obj);
    }
    for(let i = 1; i <= OQ_numQuestions; i++){
        let obj = {};
        if($('#MC-q-'+i).length === 0){
            continue;
        }
        obj.question = $('#MC-q-'+i).val();
        obj.answer = $('#MC-a-'+i).val();
        oqQuestions.push(obj);
    }
    console.log(mcQuestions);
    console.log(oqQuestions);
}