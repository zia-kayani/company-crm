<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" class="register-button-column">
        <v-dialog v-model="dialog" persistent width="550px">
          <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props"> Register Company </v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h5">
                Company Registration
                <v-btn @click="dialog = false" density="compact" icon="mdi-close" color="red" style="float: right;"></v-btn>
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent="handleSubmit">
                <v-text-field
                  v-model="companyName"
                  label="Company Name"
                  required
                  prepend-inner-icon="mdi-registered-trademark"
                ></v-text-field>
                <v-text-field
                  v-model="companyDescription"
                  label="Company Description"
                  type="text"
                  required
                  prepend-inner-icon="mdi-text-box"
                ></v-text-field>
                <v-text-field
                  v-model="companyWebsite"
                  label="Website URL"
                  type="text"
                  required
                  prepend-inner-icon="mdi-web"
                ></v-text-field>
                <v-alert v-if="error" type="error">{{ error }}</v-alert>
                <v-alert v-if="success" type="success">{{ success }}</v-alert>
                <v-btn color="primary" type="submit">@{{ editIndex !== null && editIndex !== undefined ? 'Update' : 'Register' }}</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="8">
          <v-card class="company-list-card">
            <v-card-title class="headline">
                Registered Companies
            </v-card-title>

            <v-card-text>
              <v-table>
                <thead>
                  <tr>
                    <th class="text-left">Company Name</th>
                    <th class="text-left">Company Description</th>
                    <th class="text-left">Website</th>
                    <th></th> 
                    <th></th> 
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in registeredCompanies" :key="index">
                    <td>{{ item.companyName }}</td>
                    <td>{{ item.companyDescription }}</td>
                    <td>{{ item.companyWebsite }}</td>
                    <td>
                      <!-- Delete Button -->
                      <v-btn color="error" @click="deleteCompany(index)">Delete</v-btn>
                    </td>
                    <td>
                      <!-- Update Button -->
                      <v-btn color="primary" @click="editCompany(index)">Update</v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      companyName: "",
      companyDescription: "",
      companyWebsite: "",
      error: "",
      success: "",
      registeredCompanies: [],
      dialog: false,
      editIndex: null, 
    };
  },
  methods: {
    handleSubmit() {
      this.error = "";
      this.success = "";

      if (!this.companyName || !this.companyDescription || !this.companyWebsite) {
        this.error = "Please fill in all fields";
        return;
      }

      const formData = {
        companyName: this.companyName,
        companyDescription: this.companyDescription,
        companyWebsite: this.companyWebsite,
      };

      if (this.editIndex !== null && this.editIndex !== undefined) {
        // Update existing company information
        this.registeredCompanies.splice(this.editIndex, 1, formData);
      } else {
        // Add new company information
        this.registeredCompanies.push(formData);
      }

      localStorage.setItem("registeredCompanies", JSON.stringify(this.registeredCompanies));

      this.success = this.editIndex !== null && this.editIndex !== undefined ? "Company updated successfully" : "Company registered successfully";
      this.companyName = "";
      this.companyDescription = "";
      this.companyWebsite = "";
      this.editIndex = null; /* Reset editIndex after successful update or registration */
      this.dialog = false;
    },
    updateRegisteredCompanies() {
      const storedData = localStorage.getItem("registeredCompanies");
      try {
        this.registeredCompanies = JSON.parse(storedData) || [];
      } catch (error) {
        console.error("Error parsing company data:", error);
        this.registeredCompanies = [];
      }
    },
    deleteCompany(index) {
      this.registeredCompanies.splice(index, 1);
      this.saveRegisteredCompanies();
    },
    editCompany(index) {
      const company = this.registeredCompanies[index];
      this.companyName = company.companyName;
      this.companyDescription = company.companyDescription;
      this.companyWebsite = company.companyWebsite;
      this.editIndex = index; /* Set editIndex to the index of the company being edited */
      this.dialog = true;
    },
    saveRegisteredCompanies() {
      localStorage.setItem("registeredCompanies", JSON.stringify(this.registeredCompanies));
    },
  },
  created() {
    this.updateRegisteredCompanies();
  },
};
</script>

<style scoped>
.fill-height {
  width: 100%;
}
.company-list-card {
  max-width: 800px; 
}
.register-button-column {
  display: flex;
  justify-content: center;
  align-items: flex-start; 
}
</style>
