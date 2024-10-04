import SimpleLimit from "./index";

const limit = new SimpleLimit(5);
limit.start();

setInterval(() => {
  limit.add(async () => {
    const time = Date.now();
    console.log(time, "add");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(time, "end", Date.now() - time);
  });
  console.log(limit.getCurrent(), limit.getQueueLength());
}, 100);
