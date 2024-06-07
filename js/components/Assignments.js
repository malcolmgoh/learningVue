import AssignmentList from "./AssignmentList.js";
import AssignmentCreate from "./AssignmentCreate.js";

export default{
    components: { AssignmentList, AssignmentCreate },

    template: `
        <section class="space-y-6">
            <assignment-list 
                :assignments="filters.inProgress" 
                title="In Progress"
            ></assignment-list>

            <assignment-list 
                :assignments="filters.completed" 
                title="Completed"
            ></assignment-list>

            <assignment-create
                @add="add"
            ></assignment-create>
        </section>
    `,
    data(){
        return{
            assignment: [],
        }
    },

    computed:{
        filters(){
            return{
                inProgress: this.assignment.filter(assignment => ! assignment.complete),
                completed: this.assignment.filter(assignment => assignment.complete)
            }
        }
    },

    created(){
        fetch('http://localhost:3001/assignments')
            .then(response => response.json())
            .then (assignments => {
                this.assignment = assignments;
            });
    },

    methods:{
        add(name){
            this.assignment.push({
                name: name,
                completed: false,
                id: this.assignment.length + 1
            })
        }
    }
}