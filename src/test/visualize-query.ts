import { jsql } from "../lib/main";
import { usersArray } from "./test-array";

const result = jsql(usersArray)
  .select(["name", "age", "address.city"])
  .execute();

const formatedRes = JSON.stringify(result, null, 2);
document.getElementById("output")!.innerText = formatedRes;
