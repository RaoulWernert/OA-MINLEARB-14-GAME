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
    $('#memContainer').toggle(type === 'mem');
}

let MEM_numQuestions = 1;
let MC_numQuestions = 1;
let OQ_numQuestions = 1;
const addMEM_Question = function () {
    MEM_numQuestions++;
    let tr = '<tr id=MEM-question'+MEM_numQuestions+'></tr>';
    let question = '<td><input style="width: 95%" id="MEM-q-'+MEM_numQuestions+'"></td>';
    let answer = '<td><input style="width: 95%" id="MEM-a-'+MEM_numQuestions+'"></td>';

    tr = $(tr).append(question, answer);
    if(MEM_numQuestions > 1){
        let removeButton = '<td><button onclick="MEM_RemoveQuestion('+MEM_numQuestions+')">X</button></td>';
        tr = $(tr).append(removeButton);
    }
    $('#MEM-table').append(tr);
}
const MEM_RemoveQuestion = function(index){
    $('#MEM-question'+index).remove();
    if(index == MEM_numQuestions){
        MEM_numQuestions--;
    }
}
const addMC_Question = function () {
    MC_numQuestions++;
    let tr = '<tr id=MC-question'+MC_numQuestions+'></tr>';
    for(let i = 0; i < 5; i++){
        let td = '<td><input style="width: 95%" id="MC-'+MC_numQuestions+'-'+i+'"></td>';
        tr = $(tr).append(td);
    }

    if(MC_numQuestions > 1){
        let removeButton = '<td><button onclick="MC_RemoveQuestion('+MC_numQuestions+')">X</button></td>';
        tr = $(tr).append(removeButton);
    }
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

    tr = $(tr).append(question, answer);
    if(OQ_numQuestions > 1){
        let removeButton = '<td><button onclick="OQ_RemoveQuestion('+OQ_numQuestions+')">X</button></td>';
        tr = $(tr).append(removeButton);
    }
    $('#OQ-table').append(tr);
}

function onExportClicked(){
    let memQuestions = [];
    let mcQuestions = [];
    let oqQuestions = [];
    
    let mcChecked = $('#mc-checkbox').is(":checked");
    let oqChecked = $('#oq-checkbox').is(":checked");
    if(!mcChecked && !oqChecked){
        alert('Please check at least 1 checkbox');
        return;
    }

    for(let i = 1; i <= MEM_numQuestions; i++){
        let o = {};
        if(!$('#MEM-q-'+i).val() || $('#MEM-q-'+i).val().length === 0){
            continue;
        }
        o.q = $('#MEM-q-'+i).val();
        o.a = $('#MEM-a-'+i).val();
        memQuestions.push(o);
    }
    for(let i = 1; i <= MC_numQuestions; i++){
        let o = {};
        if($('#MC-'+i+'-0').val().length === 0){
            continue;
        }
        o.q = $('#MC-'+i+'-0').val();
        o.a = $('#MC-'+i+'-1').val();
        o.w1 = $('#MC-'+i+'-2').val();
        o.w2 = $('#MC-'+i+'-3').val();
        o.w3 = $('#MC-'+i+'-4').val();
        mcQuestions.push(o);
    }
    for(let i = 1; i <= OQ_numQuestions; i++){
        let o = {};
        if($('#OQ-q-'+i).val().length === 0){
            continue;
        }
        o.q = $('#OQ-q-'+i).val();
        o.a = $('#OQ-a-'+i).val();
        oqQuestions.push(o);
    }
    let dataObj = {
        'mem': memQuestions,
        'mc': mcQuestions,
        'oq': oqQuestions,
        'mcE': mcChecked,
        'oqE': oqChecked,
    }

    let dataStr = btoa(JSON.stringify(dataObj));
    copyStringToClipboard(dataStr);
    alert('Import data copied to clipboard');
}

function copyStringToClipboard(str) {
    var el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
 }

 function onImportClicked(){
    let str = $('#import-textarea').val();
    let data = JSON.parse(atob(str));

    $('#mc-checkbox').prop("checked", data['mcE']);
    $('#oq-checkbox').prop("checked", data['oqE']);

    let mem = data['mem'];
    let mc = data['mc'];
    let oq = data['oq'];

    $('#MEM-table').empty();
    $('#MC-table').empty();
    $('#OQ-table').empty();
    MEM_numQuestions = 0;
    MC_numQuestions = 0;
    OQ_numQuestions = 0;
    
    for(let i = 1; i <= oq.length; i++){
        addMEM_Question();
        let o = mem[i-1];
        $('#MEM-q-'+i).val(o.q);
        $('#MEM-a-'+i).val(o.a);
    }
    for(let i = 1; i <= mc.length; i++){
        addMC_Question();
        let o = mc[i-1];
        $('#MC-'+i+'-0').val(o.q);
        $('#MC-'+i+'-1').val(o.a);
        $('#MC-'+i+'-2').val(o.w1);
        $('#MC-'+i+'-3').val(o.w2);
        $('#MC-'+i+'-4').val(o.w3);
    }
    for(let i = 1; i <= oq.length; i++){
        addOQ_Question();
        let o = oq[i-1];
        $('#OQ-q-'+i).val(o.q);
        $('#OQ-a-'+i).val(o.a);
    }
 }

 function onConfigBack(){
    toggleFields(false);
 }
 
 function init(){
    for(let i = 2; i <= 12; i++){
        addMEM_Question();
        $('#MEM-q-'+i).val(i + ' * 1');
        $('#MEM-a-'+i).val(i);
    }
}

setTimeout(init, 300);