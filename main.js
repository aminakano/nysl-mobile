
var app = new Vue({
    el:"#app",
    data:{
      object:[],
      games:[],
      locations:[],
      teams:[],
      shields:[],
      info:[],
      teamsObject: [],
      dataIsLoaded: false,
      months:['September','October'],
      filterData:[],
      monthSelected: "all",
      teamSelected:"all",
      locationSelected:"all",
      currentpage:"landing",

    },
    created:function(){
      this.getData();
    },
    methods: {
      getData: function(){
          fetch("https://api.myjson.com/bins/m58l6",
              {method: "GET"})
          .then(function(response){
            return response.json();
          }).then(function(json){
            app.dataIsLoaded = true;
            app.object = json;
            app.teamsObject = app.object.teams;
            app.locations = app.object.locations;
            app.games = app.object.games;
            app.filterData = app.games;
            // app.showlanding = true;
              app.teamName();
              app.shieldImg();
              app.teamInfo();

          }).catch(function(error){
            console.log(error);
          })
      },

      teamName: function(){
        var a = Object.values(app.object.teams);
        app.teams = [];
        for(let i =0; i < a.length; i++){
          app.teams.push(a[i].name);
        }
        return app.teams;
      },
      shieldImg: function(){
        var a = Object.values(app.object.teams);
        app.shields = [];
        for(let i =0; i < a.length; i++){
          app.shields.push(a[i].shield);
        }
        return app.shields;
      },

      teamInfo: function(){
        var a = Object.values(app.object.teams);
        app.info = [];
        for(let i =0; i<a.length; i++){
          app.info.push(a[i]);
        }return app.info;
      },
      filterGame: function(){
        app.filterData = [];

          var b =app.games;
          for(let i=0; i<b.length; i++){
              // if(b[i].month == app.monthSelected && app.monthSelected != "" && app.teamsObject[b[i].team].name == app.teamSelected && app.teamSelected != "" && app.locations[b[i].location].name == app.locationSelected && app.locationSelected != ""){
              //   app.filterData.push(b[i]);
              // }


              if (b[i].month == app.monthSelected || app.monthSelected == "all") {
                if (app.teamsObject[b[i].team].name == app.teamSelected || app.teamsObject[b[i].opponent].name == app.teamSelected||app.teamSelected == "all") {
                  if (app.locations[b[i].location].name == app.locationSelected || app.locationSelected == "all") {
                    app.filterData.push(b[i]);
                  }
                }
              }

          }
      },
      storeMonth: function(event){
        app.monthSelected = event.target.value;
      },
      storeTeam: function(event){
        app.teamSelected = event.target.value;
      },
      storeLocation: function(event){
        app.locationSelected = event.target.value;
      },
      openAccordion: function(id){
        document.getElementById(id).classList.toggle('is-open');
      },
      confirmMap: function(href){

        var x = confirm("Open in Map?");
        if(x == true){
          location.href = href;
        }else {
          console.log("no");
        }
      },

      currentPage: function(page){
        app.currentpage = page;
        if(app.currentpage == 'result'){
          app.filterGame();
        }
        if(app.currentpage == 'schedule'){
          app.locationSelected = 'all';
          app.monthSelected = 'all';
          app.teamSelected = 'all';
        }

      }

      },




})
