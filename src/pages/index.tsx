import UseState from "@components/UseState";
import ClassState from "@components/ClassState";

export default function Home() {
  return (
    <div>
      <UseState name="UseState" />
      <ClassState name="ClassState" />
    </div>
  );
}
