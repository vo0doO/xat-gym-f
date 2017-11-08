<template>
  <div id="add_new_program">
    <h3>Add new program</h3>
    <form class="form-horizontal">
      <div class="form-group">
        <label class="control-label col-sm-2">Program:</label>
        <div class="col-sm-10">
          <input :disabled="inp_program_name" v-model="program_name" type="text" class="form-control" id="Name">
        </div>
        <button :disabled="inp_add_new_exercise" class="new-ex" @click="addNewExInput()">+</button>
        <div v-for="e in exercises">
          <div class="add-new-ex">
            <input :disabled="inp_exercises_names" v-model="e.name" type="text">
            <span>
              <button :disabled="inp_delete_exercise" @click="deleteExInput(e)" class="delete-ex-input">-</button>
            </span>
          </div>
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button :disabled="inp_save_button" @click="saveEx()" type="submit" class="btn btn-default">Save</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  var main_app = require('../App');

  export default {
    name: 'add_new_program',
    data() {
      return {
        exercises: [],
        program_name: '',

        inp_program_name: false,
        inp_exercises_names: false,
        inp_add_new_exercise: false,
        inp_delete_exercise: false,
        inp_save_button: false
      }
    },

    mounted() {
      //this.checkSignInStatus();
    },

    methods: {
      addNewExInput() {
        if (this.exercises.length == 0) {
          this.exercises.push({
            id: 0,
            name: ''
          })
        } else {
          var last_element_id = this.exercises[this.exercises.length - 1].id;
          last_element_id++;

          this.exercises.push({
            id: last_element_id,
            name: ''
          });
        }
      },

      deleteExInput(e) {
        for (var i = 0; i < this.exercises.length; i++) {
          if (this.exercises[i].id == e.id && this.exercises[i].name == e.name) {
            this.exercises.splice(i, 1);
          }
        }
      },

      saveEx() {
        if (this.program_name === '') {
          alert('Program name cannot be empty');

          return;
        }
        if (this.exercises.length == 0) {
          alert('Please add at least one exercise');

          return;
        }

        this.disableElements(true);

        var token = window.localStorage.getItem('token');

        this.axios.post('/addProgram', {
          Program_name: this.program_name,
          Exercises: this.exercises,
          Token: token
        })
        .then(response => {
          if (response.data.Status == false) {
            alert(response.data.Body.Msg);

            this.disableElements(false);

            return;
          } else {

            this.$router.push({
              name: 'my_programs'
            });
            this.disableElements(false);
          }
        }).catch(err => {
          alert(err);

          this.disableElements(false);
        });
      },

      disableElements(status) {
        this.inp_program_name = status;
        this.inp_exercises_names = status;
        this.inp_add_new_exercise = status;
        this.inp_delete_exercise = status;
        this.inp_save_button = status;

        this.$parent.animation_status = status;
      }
    }
  }

</script>

<style>


</style>
