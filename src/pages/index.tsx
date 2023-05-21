import UseState from "@components/UseState";
import ClassState from "@components/ClassState";
import UseReducer from "hooks/useReducer";

export default function Home() {
  return (
    <div>
      <UseState name="UseState" />
      <ClassState name="ClassState" />
      <UseReducer name="UseReducer" />
    </div>
  );
}
