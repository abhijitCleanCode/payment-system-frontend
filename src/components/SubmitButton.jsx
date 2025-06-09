import { Button } from "./ui/button";

const SubmitButton = ({ isLoading, className, children }) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? "shad-primary-btn w-full"}
    >
      {isLoading ? <div>Loading...</div> : children}
    </Button>
  );
};

export default SubmitButton;
