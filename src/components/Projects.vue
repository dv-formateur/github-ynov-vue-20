<template>
  <div id="Projects">
    <div id="filter-container">
      <div>
        <label for="date_range">Date range :</label>
        </br>
        <date-picker name="date_range" i18n="EN" @selected="onDateSelected" compat="true"></date-picker>
        <button v-on:click="resetDate()">
          X
        </button>
      </div>
      <div>
        <label for="select_user">User :</label>
        </br>
        <select name="select_user" v-on:change="refreshData" v-model="user_selected">
          <option value="All">All</option>
          <option v-for="option in usernames" v-bind:value="option">{{option}}</option>
        </select>
      </div>
      <div>
        <label for="project_select">Projet :</label>
        </br>
        <select name="project_select" v-on:change="refreshData" v-model="project_selected">
          <option value="All">All</option>
          <option v-for="project in projects" v-bind:value="project.full_name">{{project.full_name}}</option>
        </select>
      </div>
    </div>

    <span>
      {{errorDate}}
    </span>
    <div id="project-container" class="uk-container">
      <div v-for="project in projects_to_display" class="project">
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
                projects_to_display:[],
                errorDate: "",
                selectedDate: {
                    start: "",
                    end: ""
                },
                usernames:[]
            }
        },
        created(){
            var that = this
            axios.defaults.headers.common["Authorization"] = "token f9b17e0a48f859a097773b394bf04082e83c9176";
            axios({method: "GET", "url": "https://api.github.com/search/repositories?q=github-ynov-vue"}).then((result)=>{
                if(result.data.items.length > 0) {
                    result.data.items.forEach((project) => {
                        this.usernames.push(project.full_name.split('/')[0])
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
                this.projects_to_display = Object.assign(this.projects)
                console.log(this.projects_to_display)
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
                var new_array = JSON.parse(JSON.stringify(this.projects));
                var last = new_array.length
                if(this.project_selected != "All"){
                    for(var i = 0; i<last;i++){
                        if(new_array[i].full_name != this.project_selected){
                            new_array.splice(i, 1)
                            i--
                            last--
                        }
                    }
                }
                last = new_array.length
                if(this.user_selected != "All"){
                    for(i = 0; i<last;i++){
                        if(new_array[i].full_name.split('/')[0] != this.user_selected){
                            new_array.splice(i, 1)
                            i--
                            last--
                        }
                    }
                }



                this.projects_to_display = new_array
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
            },
            resetDate: ()=>{
                this.selectedDate.start = ""
                this.selectedDate.end = ""
            }
        }
    }
</script>

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
  #filter-container{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 70px;
    background: #878787;
  }
  #filter-container select{
    background: transparent;
    border-radius: 0;
    border: 0;
    width: 200px;
    color: #FFF;
    border: 0;
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
