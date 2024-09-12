import ShowLoading from "../../views/Loading";
import BoxNotice from "../Alert/BoxNotice";
import LoadingView from "./LoadingView";

export const Renderer = ({
  name,
  element,
  store,
  params = null,
  redirect = null,
  translate = null,
}) => {
  const { items, error, isLoaded } = LoadingView(store, params, redirect);

  const Component = element;

  return isLoaded(name) ? (
    <Component items={items} translate={translate} {...params} />
  ) : error ? (
    <BoxNotice icon={{ name: "lnr-power-switch", color: "red" }} fadeIn={true}>
      <h4>Error</h4>
      <p>
        Server returned an error. Please refresh the page or try again later.
      </p>
    </BoxNotice>
  ) : (
    <ShowLoading />
  );
};

export default Renderer;
