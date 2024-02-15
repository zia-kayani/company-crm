<template>
  <div class="gradient-background">

 
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-card-title class="headline">Login</v-card-title>

          <v-card-text>
            <v-form @submit.prevent="handleSubmit">
              <v-text-field
                v-model="email"
                label="Email"
                required
                prepend-inner-icon="mdi-email"

              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
                prepend-inner-icon="mdi-key"

              ></v-text-field>
              <v-alert v-if="emailError" type="error" variant="plain">{{ emailError }}</v-alert>
              <v-alert v-if="passwordError" type="error" variant="plain">{{
                passwordError
              }}</v-alert>
              <v-alert v-if="error" type="error" variant="plain">{{ error }}</v-alert>
              <v-alert v-if="success" type="success" variant="plain">{{ success }}</v-alert>
              <v-btn color="primary" type="submit" >Login</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</div>
</template>

<script>
import router from '../router'

export default {
  name:'Login',
  data() {
    return {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      error: "",
      success: "",
      imageUrl: "",
    };
  },
  methods: {
    handleSubmit() {
      this.emailError = "";
      this.passwordError = "";
      this.error = "";
      this.success = "";

      // Email format validation
      if (!this.validateEmail(this.email)) {
        this.emailError = "Please enter a valid email address";
        return;
      }

      // Password length validation
      if (this.password.length < 5) {
        this.passwordError = "Password must have a length greater than 5";
        return;
      }

      // Simulating login process using hardcoded credentials
      const hardcodedEmail = "zia@gmail.com";
      const hardcodedPassword = "zia123";

      if (
        this.email !== hardcodedEmail ||
        this.password !== hardcodedPassword
      ) {
        this.error = "Invalid email or password";
        return;
      }

      // Successful login
      this.success = "Login successful";

      // Access the user's camera and take a picture
      this.capturePicture()
        .then((imageDataUrl) => {
          // Save credentials and picture to local storage
          this.imageUrl = imageDataUrl;
          this.saveCredentialsToLocalStorage();

          //saved credentials in local storage
          // Console log details from local storage
          console.log("Details from local storage:");
          console.log("Email:", localStorage.getItem("email"));
          console.log("Password:", localStorage.getItem("password"));
          console.log("Image URL:", localStorage.getItem("imageUrl"));

             // Redirect to UserProfile component after successful login
             router.push('/dashboard');
        })
        .catch((error) => {
          console.error("Error capturing picture:", error);
        });
    },
    validateEmail(email) {
      // Email format validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    capturePicture() {
      return new Promise((resolve, reject) => {
        // Access user's camera and take picture
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            const video = document.createElement("video");
            video.srcObject = stream;
            video.play();

            // After 2 seconds, capture picture from the video stream
            setTimeout(() => {
              const canvas = document.createElement("canvas");
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              const ctx = canvas.getContext("2d");
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              const imageDataUrl = canvas.toDataURL("image/jpeg");

              // Stop video stream
              stream.getTracks().forEach((track) => track.stop());

              resolve(imageDataUrl); // Resolve with captured image data URL
            }, 2000);
          })
          .catch((error) => {
            console.error("Error accessing camera:", error);
            reject(error);
          });
      });
    },
    saveCredentialsToLocalStorage() {
      // Save credentials to local storage
      localStorage.setItem("email", this.email);
      localStorage.setItem("password", this.password);
      localStorage.setItem("imageUrl", this.imageUrl); // Save imageUrl to local storage
    },
  },
};
</script>
<style scoped>
.gradient-background {
  background: linear-gradient(to bottom right,#09816d, #142cb1);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
