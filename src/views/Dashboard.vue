<template>
  <v-card>
    <v-layout style="height: 100vh; overflow-y: auto">
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list-item
          prepend-avatar="https://tse1.mm.bing.net/th?id=OIP.TQ2ynzSe0hnx998sHKLVKQHaHa&pid=Api&P=0&h=220https://randomuser.me/api/portraits/men/85.jpg"
          title="zia kayani"
          nav
        >
          <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-home-city"
            title="Home"
            :value="homeValue"
            @click="selectedItem = 'home'"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-office-building"
            title="Company"
            :value="companyValue"
            @click="selectedItem = 'company'"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container>
          <v-container v-if="selectedItem === 'company'">
            <Company></Company>
          </v-container>
          <v-container v-else>
            <v-card>
              <v-card-title>zia kayani</v-card-title>
              <v-card-text> home </v-card-text>
            </v-card>
          </v-container>
        </v-container>
      </v-main>

      
    </v-layout>
  </v-card>
</template>
<script>
import Company from "./Company.vue";
export default {
  name: "Dashboard",
  data() {
    return {
      drawer: true,
      rail: true,
      selectedItem: "", /* Tracks the selected item in the drawer */
    };
  },
  computed: {
    homeValue() {
      return "home";
    },
    companyValue() {
      return "company";
    },
  },
  components: {
    Company,
  },
};
</script>
