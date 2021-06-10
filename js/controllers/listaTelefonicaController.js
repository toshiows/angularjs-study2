angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, $http){
    $scope.app = "Lista Telefonica"
    $scope.contatos = [];
    $scope.operadoras = [];

    var carregarOperadoras = function() {
        $http.get("http://localhost:3412/operadoras").then(function(response) {
            console.log(response.data);
            $scope.operadoras = response.data;
        }).then(function(error){
            $scope.message = "Aconteceu um problema";
        });
    }
    
    var carregarContatos = function() {
        
        $http.get("http://localhost:3412/contatos").then(function(response) {
            console.log(response.data)
            $scope.contatos = response.data;
        });
    }

    $scope.cores = [
        {cor: "blue"},
        {cor: "yellow"},
        {cor: "green"},
        {cor: "red"},
        {cor: "pink"}
    ]

    $scope.adicionarContato = function(contato) {
        $http.post("http://localhost:3412/contatos", contato).then(function(response){
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            carregarContatos();
        });
        
        
    }

    $scope.apagarContatos = function(contatos) {
       $scope.contatos = contatos.filter(function(contato){
            if(!contato.selecionado) return contato;
        });
    }

    $scope.isContatoSelecionado = function (contatos) {
        return contatos.some(function(contato) {
            return contato.selecionado;
        });
    }

    $scope.ordenarPor = function(campo) {
        $scope.criterioDeAceitacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    }

    carregarContatos();
    carregarOperadoras();

    $scope.aulaAtual = "https://www.youtube.com/watch?v=Y0dF9juoJb8&ab_channel=RodrigoBranasRodrigoBranas";


});