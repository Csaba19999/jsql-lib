import { jssql } from "../main";
import { usersArray } from "./test-array";

const result = jssql(usersArray)
  .select(["name", "age", "address.city"])
  .execute();

const formatedRes = JSON.stringify(result, null, 2);
document.getElementById("output")!.innerText = formatedRes;
