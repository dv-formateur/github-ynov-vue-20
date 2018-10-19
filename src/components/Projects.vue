<template>
  <div id="Projects">
    <date-picker i18n="EN" @selected="onDateSelected"></date-picker>
    <span>
      {{errorDate}}
    </span>
    <ul>
      <li v-for="project in projects">
        {{project.name}}
      </li>
    </ul>
  </div>
</template>

<script>
    import axios from "axios";
    export default {
        name: 'Projects',
        props: {},
        data: ()=>{
            return {
                projects: [],
                errorDate: "",
                selectedDate: {
                    start: "",
                    end: ""
                }
            }
        },
        created(){
            // GET /someUrl
            /*
            axios({ method: "GET", "url": "https://api.github.com/users/msaintmartin/repos" }).then(result => {
                //this.ip = result.data.origin;
                result.data.forEach((project)=>{
                    console.log(project)
                    if(project.name == "github-ynov-vue"){
                        this.projects.push(project)

                        /*
                        axios({method: "GET", "url": "https://api.github.com/repos/"+project.full_name+"/commits"}).then(res => {


                                console.log(res)
                            },
                            err => {
                                console.log(err)
                            })
                      */
                      /*
                    }
                })
            }, error => {
                console.error(error);
            });
*/
        },
        mounted(){
        },
        methods: {
            onDateSelected: function (daterange) {
                if(daterange.start != null && daterange.end != null){
                    this.selectedDate = daterange
                    this.errorDate = ""
                }
                else{
                    this.errorDate = "Select a date interval"
                }
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
</style>
