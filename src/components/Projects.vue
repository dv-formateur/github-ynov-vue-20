<template>
  <div id="Projects">
    <date-picker i18n="EN" @selected="onDateSelected" compat="true"></date-picker>
    <div v-if='selectedDate.start !== "" && selectedDate.end !== ""'>
      {{ formatDate(selectedDate.start) }}
      {{ formatDate(selectedDate.end) }}
    </div>
    <select v-on:change="refreshData" v-model="user_selected">
      <option value="All">All</option>
      <option v-for="option in usernames" v-bind:value="option">{{option}}</option>
    </select>
    <select v-on:change="refreshData" v-model="project_selected">
      <option value="All">All</option>
      <option v-for="project in projects" v-bind:value="project.full_name">{{project.full_name}}</option>
    </select>

    <span>
      {{errorDate}}
    </span>
    <div id="project-container" class="uk-container">
      <div v-for="project in projects" class="project">
        <div class="project-full_name">
          <h2>{{project.full_name}}</h2>
        </div>
        <div>
          Commits : {{project.commits.length}}
        </div>

        <div class="commit-message" v-for="commit_container in project.commits">
          {{formatDate(commit_container[0].commit.author.date)}}
          <div v-for="commit in commit_container" class="commits-details">
            {{commit.commit.author.name}} ({{commit.commit.author.email}}) : {{commit.commit.message}}
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: 'Projects',
        props: {},
        data: ()=>{
            return {
                user_selected: "All",
                project_selected: "All",
                projects: [],
                errorDate: "",
                selectedDate: {
                    start: "",
                    end: ""
                },
                usernames:[
                    "Killy85",
                    "Nair0fl",
                    "raphaelCharre",
                    "mathiasLoiret",
                    "thomaspich",
                    "TeofiloJ",
                    "Grigusky",
                    "Dakistos",
                    "mael61",
                    "KevinPautonnier",
                    "BenoitCochet",
                    "sfongue",
                    "ClementCaillaud",
                    "gfourny",
                    "Mokui",
                    "LordInateur",
                    "AntoineGOSSET",
                    "etienneYnov",
                    "Coblestone",
                    "AlexDesvallees",
                    "rudy8530",
                    "benjaminbra",
                    "mael61",
                    "alixnzt"
                ]
            }
        },
        created(){
            var that = this
            axios.defaults.headers.common["Authorization"] = "token dfdf7a0cf2745356b05221eb9815ded830b709dc";
            axios({method: "GET", "url": "https://api.github.com/search/repositories?q=github-ynov-vue"}).then((result)=>{
                if(result.data.items.length > 0) {
                    result.data.items.forEach((project) => {
                        project.commits = []
                        axios({method: "GET", "url": "https://api.github.com/repos/"+project.full_name+"/commits"}).then((res)=>{
                            if(res.data.length > 0) {
                                var last_date = "";
                                res.data.forEach((commit) => {
                                    var date_commit = that.formatDate(new Date(commit.commit.author.date))
                                    if(date_commit != last_date){
                                        last_date = date_commit
                                        project.commits.push([])
                                    }
                                    project.commits[project.commits.length-1].push(commit)
                                })
                            }
                        })
                        this.projects.push(project)
                    })
                }
                console.log(this.projects)
                console.log(this.projects[0].commits)
            })
        },
        mounted(){
        },
        methods: {
            onDateSelected: function (daterange) {
                if(daterange.start != null && daterange.end != null){
                    this.selectedDate.start = new Date(daterange.start)
                    this.selectedDate.end = new Date(daterange.end)
                    this.errorDate = ""
                }
                else{
                    this.errorDate = "Select a date interval"
                }
                this.refreshData()
            },
            refreshData: function(event){
                console.log(this.user_selected)
                console.log(this.selectedDate)
            },
            formatDate: (date) => {
                date = new Date(date)
                var monthNames = [
                    "Janvier", "Février", "Mars",
                    "Avril", "Mai", "Juin", "Juillet",
                    "Aout", "Septembre", "Octobre",
                    "Novembre", "Décembre"
                ];

                var day = date.getDate();
                var monthIndex = date.getMonth();
                var year = date.getFullYear();

                return day + ' ' + monthNames[monthIndex] + ' ' + year;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }


  .project{
    width: 100%;
    background: #efefef;
    border-radius: .3em;
    margin-bottom: 10px;
    margin-top: 10px;
    text-align: left;
    padding: 10px;
  }
  .project-full_name{
    text-align: center;
  }
  .commit-message{
    margin: 10px 0;
  }
  .commits-details{
    border-left: 1px solid black;
    margin-left: 15px;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
</style>
