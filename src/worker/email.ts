import { Worker } from "bullmq";
import { sendEmail } from "../utils/email.js";
import "dotenv/config"
console.log("email worker started");
const worker = new Worker(
  "emailQueue",
  async (job) => {
    console.log("Processing email job:", job.data);

    const { to, subject, text } = job.data;

    await sendEmail(to, subject, text);

    console.log("Email sent to", to);
  },
  {
    connection: {
      host: "127.0.0.1",
      port: 6379,
    },
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed`, err);
});