<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- App Msg -->
    <div
      v-if="statusMsg || errorMsg"
      class="mb-10 p-4 rounded-md shadow-md bg-light-grey"
    >
      <p class="text-at-light-green">
        {{ statusMsg }}
      </p>
      <p class="text-red-500">
        {{ errorMsg }}
      </p>
    </div>

    <div v-if="dataLoaded">
      <!-- General Workout Info -->
      <div
        class="flex flex-col items-center p-8 rounded-md shadow-md bg-light-grey relative"
      >
        <div v-if="user" class="flex absolute left-2 top-2 gap-x-2">
          <div
            class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer bg-at-light-green shadow-lg"
            @click="editMode"
          >
            <img
              class="h-3.5 w-auto"
              src="../assets/images/pencil-light.png"
              alt=""
            />
          </div>
          <div
            @click="deleteWorkout"
            class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer bg-at-light-green shadow-lg"
          >
            <img
              class="h-3.5 w-auto"
              src="../assets/images/trash-light.png"
              alt=""
            />
          </div>
          <div
            @click="shareWorkout('QQ')"
            class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer bg-at-light-green shadow-lg"
          >
            <img class="h-3.5 w-auto" src="../assets/images/QQ.png" alt="" />
          </div>
          <div
            @click="shareWorkout('sina')"
            class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer bg-at-light-green shadow-lg"
          >
            <img class="h-3.5 w-auto" src="../assets/images/sina.png" alt="" />
          </div>
        </div>
        <img
          v-if="data.workoutType === 'cardio'"
          class="h-24 w-auto"
          src="../assets/images/running-light-green.png"
          alt=""
        />

        <img
          v-else
          class="h-24 w-auto"
          src="../assets/images/dumbbell-light-green.png"
          alt=""
        />

        <span
          class="mt-6 py-1.5 px-5 text-xs text-white bg-at-light-green rounded-lg shadow-md"
        >
          {{ data.workoutType }}
        </span>

        <div class="w-full mt-6">
          <input
            v-if="edit"
            type="text"
            class="p-2 w-full text-gray-500 focus:outline-none"
            v-model="data.workoutName"
          />
          <h1 v-else class="text-at-light-green text-2xl text-center">
            {{ data.workoutName }}
          </h1>
        </div>
      </div>
      <!-- Exercises -->
      <div
        class="mt-10 p-8 rounded-md flex flex-col item-center bg-light-grey shadow-md"
      >
        <!-- Strength Training Inputs -->
        <div
          v-if="data.workoutType === 'strength'"
          class="flex flex-col gap-y-4 w-full"
        >
          <div
            class="flex flex-col gap-x-6 gap-y-2 relative sm:flex-row"
            v-for="(item, index) in data.exercises"
            :key="index"
          >
            <div class="flex flex-2 flex-col md:w-1/3">
              <label
                for="exercise-name"
                class="mb-1 text-sm text-at-light-green"
                >????????????
              </label>
              <input
                id="exercise-name"
                v-if="edit"
                type="text"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.exercise"
              />
              <p v-else>{{ item.exercise }}</p>
            </div>
            <div class="flex flex-col flex-1">
              <label for="sets" class="mb-1 text-sm text-at-light-green"
                >??????
              </label>
              <input
                id="sets"
                v-if="edit"
                type="text"
                class="p-2 w-full text-gray-500 focus:outline-none"
                v-model="item.sets"
              />
              <p v-else>{{ item.sets }}</p>
            </div>
            <div class="flex flex-col flex-1">
              <label for="reps" class="mb-1 text-sm text-at-light-green"
                >??????
              </label>
              <input
                v-if="edit"
                id="reps"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                v-model="item.reps"
              />
              <p v-else>{{ item.reps }}</p>
            </div>
            <div class="flex flex-col flex-1">
              <label for="weight" class="mb-1 text-sm text-at-light-green"
                >??????(kg)
              </label>
              <input
                v-if="edit"
                id="weight"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                v-model="item.weight"
              />
              <p v-else>{{ item.weight }}</p>
            </div>
            <img
              v-if="edit"
              @click="deleteExercise(item.id)"
              src="../assets/images/trash-light-green.png"
              class="absolute h-4 w-auto -left-5 cursor-pointer"
              alt=""
            />
          </div>
          <button
            v-if="edit"
            @click="addExercise"
            type="button"
            class="mt-6 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green"
          >
            ????????????
          </button>
        </div>

        <!-- Cardio Inputs -->
        <div v-else class="flex flex-col gap-y-4 w-full">
          <div
            class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row"
            v-for="(item, index) in data.exercises"
            :key="index"
          >
            <div class="flex flex-2 flex-col md:w-1/3">
              <label for="cardio-type" class="mb-1 text-sm text-at-light-green"
                >??????
              </label>
              <select
                id="cardioType"
                v-if="edit"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                v-model="item.cardioType"
              >
                <option value="#">????????????</option>
                <option value="run">??????</option>
                <option value="walk">??????</option>
              </select>
              <p v-else>{{ item.cardioType }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="distance" class="mb-1 text-sm text-at-light-green">
                ??????
              </label>
              <input
                v-if="edit"
                id="distance"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                v-model="item.distance"
              />
              <p v-else>{{ item.distance }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="duration" class="mb-1 text-sm text-at-light-green">
                ??????
              </label>
              <input
                v-if="edit"
                id="duration"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                v-model="item.duration"
              />
              <p v-else>{{ item.duration }}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="pace" class="mb-1 text-sm text-at-light-green">
                ??????
              </label>
              <input
                v-if="edit"
                id="pace"
                class="p-2 w-full text-gray-500 focus:outline-none"
                type="text"
                v-model="item.pace"
              />
              <p v-else>{{ item.pace }}</p>
            </div>
            <img
              @click="deleteExercise(item.id)"
              v-if="edit"
              class="absolute h-4 w-auto -left-5 cursor-pointer"
              src="../assets/images/trash-light-green.png"
              alt=""
            />
          </div>
          <button
            @click="addExercise"
            v-if="edit"
            type="button"
            class="py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green"
          >
            ????????????
          </button>
        </div>
      </div>

      <!-- Update -->
      <button
        v-if="edit"
        @click="update"
        type="button"
        class="mt-10 py-2 px-6 rounded-sm self-start text-sm text-white bg-at-light-green duration-200 border-solid border-2 border-transparent hover:border-at-light-green hover:bg-white hover:text-at-light-green"
      >
        ?????????????????????
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { supabase } from "../supabase/init";
import { useRoute, useRouter } from "vue-router";
import store from "../store";
import { uid } from "uid";

const data = ref(null);
const dataLoaded = ref(null);
const errorMsg = ref(null);
const statusMsg = ref(null);
const route = useRoute();
const router = useRouter();
const user = computed(() => store.state.user);

// ???????????????????????????id
const currentId = route.params.workoutId;

// ????????????
const getData = async () => {
  try {
    const { data: workouts, error } = await supabase
      .from("workouts")
      .select("*")
      .eq("id", currentId);
    if (error) throw error;
    data.value = workouts[0];
    // console.log(data.value[0].workoutName)
    dataLoaded.value = true;
  } catch (error) {
    errorMsg.value = error.message;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
getData();

// ????????????
const edit = ref(null);
const editMode = () => {
  edit.value = !edit.value;
};

// ????????????????????????
const deleteWorkout = async () => {
  try {
    const { error } = await supabase
      .from("workouts")
      .delete()
      .eq("id", currentId);
    if (error) throw error;
    router.push({ name: "Home" });
  } catch (error) {
    errorMsg.value = `Error: ${error.message}`;
    setTimeout(() => {
      errorMsg.value = false;
    }, 5000);
  }
};

// Add exercise
const addExercise = () => {
  if (data.value.workoutType === "strength") {
    data.value.exercises.push({
      id: uid(),
      exercise: "",
      sets: "",
      reps: "",
      weight: "",
    });
    return;
  }
  data.value.exercises.push({
    id: uid(),
    cardioType: "",
    distance: "",
    duration: "",
    pace: "",
  });
};

// Delete exercise
const deleteExercise = (id) => {
  if (data.value.exercises.length > 1) {
    data.value.exercises = data.value.exercises.filter(
      (exercise) => exercise.id !== id
    );
    return;
  }
  errorMsg.value = "?????????????????????????????????";
  setTimeout(() => {
    errorMsg.value = false;
  }, 5000);
};

// ??????????????????
const update = async () => {
  try {
    const { error } = await supabase
      .from("workouts")
      .update({
        workoutName: data.value.workoutName,
        exercises: data.value.exercises,
      })
      .eq("id", currentId);
    if (error) throw error;
    edit.value = false;
    statusMsg.value = "????????????";
    setTimeout(() => {
      statusMsg.value = null;
    }, 5000);
  } catch (error) {
    errorMsg.value = `?????????${error.message}`;
    setTimeout(() => {
      errorMsg.value = false;
    }, 5000);
  }
};

// share Workout
const shareWorkout = (shareWay) => {
  if (shareWay === "QQ") {
    //?????????QQ??????(PC?????????)
    const share = {
      title: "????????????",
      desc: "????????????????????????????????????~",
      share_url: "https://active-tracker.onrender.com/",
    };
    location.replace(
      "https://connect.qq.com/widget/shareqq/index.html?url=" +
        encodeURIComponent(share.share_url) +
        "&title=" +
        share.title +
        "&desc=" +
        share.desc
    );
  } else {
    const share = {
      title: "????????????",
      image_url: ["../assets/QQ.png"],
      share_url: "https://active-tracker.onrender.com/",
    };
    //????????????
    location.replace(
      "https://service.weibo.com/share/share.php?url=" +
        encodeURIComponent(share.share_url) +
        "&title=" +
        share.title +
        "&pic=" +
        share.image_url +
        "&searchPic=true"
    );
  }
};
</script>
