import { CardWrapper } from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export const ErrorCard = () => {
  return (
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="Back to login?"
      headerLabel="Oops! Something went terribly wrong."
    >
      <div className="flex justify-center">
        <ExclamationTriangleIcon className="text-destructive"></ExclamationTriangleIcon>
      </div>
    </CardWrapper>
  );
};
