const url_api = "http://localhost:3000/api/";

function getAlunos(){
    $.ajax({
        type: "GET",
        data: {},
        url: `${url_api}alunos`,
        dataType: "json",
        success: function(data){
            //$(".carregando").css("display","none");
            if (data.length > 0){
                preencheAlunos(data);
            }
        },
        timeout: function(msg){
        },
        fail: function(msg){
        },
        beforeSend: function(msg){
        },
        complete: function(msg){
        },
        error: function(msg){
        }
    });
}

function preencheAlunos(alunos){
    let html = '';
    alunos.forEach(a => {
        html += `<ol>${a.nome}, tem ${a.idade} anos de idade.</ol>`
    });
    document.querySelector('#lista_alunos').innerHTML = html;
}


function getUsuarios(){
    $.ajax({
        type: "GET",
        data: {},
        url: `${url_api}usuarios`,
        dataType: "json",
        success: function(data){
            //$(".carregando").css("display","none");
            if (data.length > 0){
                console.log(data);
            }
        },
        timeout: function(msg){
        },
        fail: function(msg){
        },
        beforeSend: function(msg){
        },
        complete: function(msg){
        },
        error: function(msg){
        }
    });
}

function getAvaliacoes(){
    $.ajax({
        type: "GET",
        data: {},
        url: `${url_api}avaliacoes`,
        dataType: "json",
        success: function(data){
            //$(".carregando").css("display","none");
            if (data.length > 0){
                console.log(data);
            }
        },
        timeout: function(msg){
        },
        fail: function(msg){
        },
        beforeSend: function(msg){
        },
        complete: function(msg){
        },
        error: function(msg){
        }
    });
}