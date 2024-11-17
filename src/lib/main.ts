import { IUser } from "../test/test-array";

type Aggregation = {
  type: "count" | "max";
  field: string;
};

type FilterCondition = {
  field?: string;
  value?: any;
  operator?: string;
  type?: string;
};

type State = {
  rawInput: any[];
  selectedFields: string[];
  filterConditions: FilterCondition[];
  groupByField: string | null;
  orderByField: string | null;
  orderDirection: "asc" | "desc";
  limitCount: number | null;
  aggregations: Aggregation[];
  currentField?: string;
  currentOperator?: string;
  select(key: string | string[]): State;
  where(key: string): State;
  is(value: any): State;
  not(): State;
  null(): State;
  equal(value: any): State;
  greaterThan(value: any): State;
  lessThan(value: any): State;
  lessThanOrEqual(value: any): State;
  groupBy(field: string): State;
  orderBy(field: string, direction?: "asc" | "desc"): State;
  limit(count: number): State;
  count(field: string): State;
  max(field: string): State;
  execute(): any;
};

const getNestedValue = (obj: any, path: string): any => {
  return path.split(".").reduce((acc, key) => acc && acc[key], obj);
};

const setNestedValue = (obj: any, path: string, value: any): void => {
  const keys = path.split(".");
  let current = obj;
  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value;
    } else {
      if (!current[key]) current[key] = {};
      current = current[key];
    }
  });
};

export function jsql(input: IUser[]): State {
  const state: State = {
    rawInput: input,
    selectedFields: [],
    filterConditions: [],
    groupByField: null,
    orderByField: null,
    orderDirection: "asc",
    limitCount: null,
    aggregations: [],
    select: function (key: string | string[]): State {
      this.selectedFields = Array.isArray(key) ? key : [key];
      return this;
    },
    where: function (key: string): State {
      this.currentField = key;
      return this;
    },
    is: function (value: any): State {
      this.filterConditions.push({
        field: this.currentField!,
        value,
        operator: "is",
      });
      return this;
    },
    not: function (): State {
      this.currentOperator = "not";
      return this;
    },
    null: function (): State {
      this.filterConditions.push({
        field: this.currentField!,
        operator: this.currentOperator === "not" ? "not null" : "null",
        value: null,
      });
      this.currentOperator = undefined;
      return this;
    },
    equal: function (value: any): State {
      this.filterConditions.push({
        field: this.currentField!,
        value,
        operator: "=",
      });
      return this;
    },
    greaterThan: function (value: any): State {
      this.filterConditions.push({
        field: this.currentField!,
        value,
        operator: ">",
      });
      return this;
    },
    lessThan: function (value: any): State {
      this.filterConditions.push({
        field: this.currentField!,
        value,
        operator: "<",
      });
      return this;
    },
    lessThanOrEqual: function (value: any): State {
      this.filterConditions.push({
        field: this.currentField!,
        value,
        operator: "<=",
      });
      return this;
    },
    groupBy: function (field: string): State {
      this.groupByField = field;
      return this;
    },
    orderBy: function (
      field: string,
      direction: "asc" | "desc" = "asc"
    ): State {
      this.orderByField = field;
      this.orderDirection = direction;
      return this;
    },
    limit: function (count: number): State {
      this.limitCount = count;
      return this;
    },
    count: function (field: string): State {
      this.aggregations.push({ type: "count", field });
      return this;
    },
    max: function (field: string): State {
      this.aggregations.push({ type: "max", field });
      return this;
    },
    execute: function (): any {
      let filteredData: any[] = [];
      let aggregatedResult: any = {};

      // Apply filter conditions and prepare selected data
      this.rawInput.forEach((item) => {
        let result = true;

        // Filter logic
        this.filterConditions.forEach((condition) => {
          const fieldValue = getNestedValue(item, condition.field!);
          let matches = false;

          switch (condition.operator) {
            case "is":
            case "=":
              matches = fieldValue === condition.value;
              break;
            case ">":
              matches = fieldValue > condition.value;
              break;
            case "<":
              matches = fieldValue < condition.value;
              break;
            case "<=":
              matches = fieldValue <= condition.value;
              break;
            case "not null":
              matches = fieldValue !== null;
              break;
            case "null":
              matches = fieldValue === null;
              break;
            default:
              matches = false;
          }

          if (!matches) {
            result = false;
          }
        });

        if (result) {
          // Only include selected fields
          let selectedItem = this.selectedFields.length === 0 ? item : {};
          this.selectedFields.forEach((field) => {
            const value = getNestedValue(item, field);
            if (field.includes(".")) {
              setNestedValue(selectedItem, field, value);
            } else {
              selectedItem[field] = value;
            }
          });

          filteredData.push(selectedItem);

          // Aggregation logic
          this.aggregations.forEach((aggregation) => {
            const fieldValue = getNestedValue(item, aggregation.field);
            if (aggregation.type === "count") {
              aggregatedResult.count = (aggregatedResult.count || 0) + 1;
            } else if (aggregation.type === "max") {
              aggregatedResult.max = Math.max(
                aggregatedResult.max || -Infinity,
                fieldValue
              );
            }
          });
        }
      });

      // Apply limit if set
      if (this.limitCount !== null) {
        filteredData = filteredData.slice(0, this.limitCount);
      }

      // Return results
      return aggregatedResult.count || aggregatedResult.max
        ? aggregatedResult
        : filteredData;
    },
  };

  return state;
}
