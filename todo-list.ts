#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";

let todoList = [];
let condition: boolean = true;

while (condition) {
  // ------------------------ user input-----------------------.
  let userInput = await inquirer.prompt([
    {
      name: "input",
      type: "list",
      message: chalk.bgBlueBright.bold("please select one option"),
      choices: ["add", "update" ,"remove"],
    },
  ]);
  // ---------------------------- add ----------------------------.
  if (userInput.input === "add") {
    let todoQuestion = await inquirer.prompt([
      {
        name: "firstQuestion",
        type: "input",
        message: chalk.blueBright.bold(
          "what would you like to add in your todo list"
        ),
      },
    ]);

    if (todoQuestion.firstQuestion !== "") {
      todoList.push(todoQuestion.firstQuestion);
      console.log(chalk.green.bold(todoList));
    } else {
      console.log(chalk.red.bold("your value is invalid"));
    }
  }

  // ------------------------------------- update ------------------------------.
  if (userInput.input === "update") {
    let update = await inquirer.prompt([
      {
        name: "updateItem",
        type: "list",
        message: chalk.blueBright.bold("do you want to change anything"),
        choices: todoList,
      },
    ]);

    let indexUpdate = todoList.indexOf(update.updateItem);

    if (indexUpdate !== -1) {
      let updateValue: any = await inquirer.prompt([
        {
          name: "newValue",
          type: "input",
          message: chalk.blueBright.bold(`please enter new value for "${update.updateItem}"`),
        },
      ]);
      todoList[indexUpdate] = updateValue.newValue;
      console.log(
        chalk.blue.bold("you update :"),
        chalk.red.bold(update.updateItem),
        chalk.green.bold(updateValue.newValue)
      );
      console.log(chalk.green.bold(todoList));
    }
  }

  // ---------------------------------- remove -------------------------------.
  else if (userInput.input === "remove") {
    let removeOption = await inquirer.prompt([
      {
        name: "removeItem",
        type: "list",
        message: chalk.green.bold("selecrt item to remove"),
        choices: todoList,
      },
    ]);

    let indexRemove = todoList.indexOf(removeOption.removeItem);

    if (indexRemove >= 0) {
      todoList.splice(indexRemove, 1);
      console.log(
        chalk.blue.bold("you removed :"),
        chalk.red.bold(removeOption.removeItem)
      );
      console.log(chalk.green.bold(todoList));
    }
  }

  // ------------------------------- confirmition --------------------
  let userAns = await inquirer.prompt([
    {
      name: "selection",
      type: "confirm",
      message: chalk.blueBright.bold("do you want to continue"),
      default: true,
    },
  ]);

  if (userAns.selection === false) {
    condition = false;
  }
}
console.log(chalk.blue.bold("thank you for using todo list"));
