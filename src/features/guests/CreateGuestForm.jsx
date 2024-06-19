import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Spinner from "../../ui/Spinner";
import Select from "../../ui/Select";
import { useCountries } from "../../hooks/useCountries";
import { useCreateGuest } from "./useCreateGuest";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useUpdateGuest } from "./useUpdateGuest";
import { useWindowSize } from "../../hooks/useWindowSize";
import { windowSizes } from "../../utils/constants";
import FormRowVertical from "../../ui/FormRowVertical";

function CreateGuestForm({ guestToUpdate = {}, onCloseModal }) {
  const { isCreating, createGuest } = useCreateGuest();
  const { isUpdating, updateGuest } = useUpdateGuest();
  const isWorking = isCreating || isUpdating;
  const { width } = useWindowSize();

  const { id: updateId, ...updateValues } = guestToUpdate;
  const isUpdateSession = Boolean(updateId);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: isUpdateSession ? updateValues : {},
  });

  const { countries, isLoading: isLoadingCountries } = useCountries();

  if (isLoadingCountries) {
    return <Spinner />;
  }

  const countriesOptionsNationality = [
    { value: "", label: "Select a Country" },
    ...countries
      .sort((a, b) => a.label.localeCompare(b.label))
      .map((country, index) => ({
        value: country.label,
        label: country.label,
        flagUrl: country.flagUrl,
        key: `${country.value}-${index}`,
      })),
  ];

  function onSubmit(data) {
    const countryFlag = countries.find(
      (country) => country.label === data.nationality
    )?.flagUrl;

    if (isUpdateSession) {
      updateGuest(
        { editGuestData: data, id: updateId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createGuest(
        { ...data, countryFlag },
        {
          onSuccess: () => {
            toast.success(`A new guest was created`);
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <>
      {width >= windowSizes.tablet ? (
        <Form
          onSubmit={handleSubmit(onSubmit, onError)}
          type={onCloseModal ? "modal" : "regular"}
        >
          <FormRow label="id">
            <Input disabled value={updateId} />
          </FormRow>

          <FormRow label="Full name" error={errors?.fullName?.message}>
            <Input
              type="text"
              id="fullName"
              disabled={isWorking}
              {...register("fullName", { required: "This field is required" })}
            />
          </FormRow>

          <FormRow label="Email" error={errors?.email?.message}>
            <Input
              type="text"
              id="email"
              disabled={isWorking}
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
          </FormRow>

          <FormRow label="National ID" error={errors?.nationalID?.message}>
            <Input
              type="text"
              id="nationalID"
              disabled={isWorking}
              {...register("nationalID", {
                required: "This field is required",
              })}
            />
          </FormRow>

          <FormRow label="Nationality" error={errors?.nationality?.message}>
            <Controller
              name="nationality"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={countriesOptionsNationality}
                  disabled={isWorking}
                  {...register("nationality", {
                    required: "This field is required",
                  })}
                />
              )}
            />
          </FormRow>

          <FormRow>
            {/* type is an HTML attribute! */}
            <Button
              variation="secondary"
              type="reset"
              disabled={isWorking}
              onClick={() => onCloseModal?.()}
            >
              Cancel
            </Button>
            <Button disabled={isWorking} type="submit">
              {isUpdateSession ? "Update Guest" : "Create new guest"}
            </Button>
          </FormRow>
        </Form>
      ) : (
        <Form
          onSubmit={handleSubmit(onSubmit, onError)}
          type={onCloseModal ? "modal" : "regular"}
        >
          <FormRowVertical label="id">
            <Input disabled value={updateId} />
          </FormRowVertical>

          <FormRowVertical label="Full name" error={errors?.fullName?.message}>
            <Input
              type="text"
              id="fullName"
              disabled={isWorking}
              {...register("fullName", { required: "This field is required" })}
            />
          </FormRowVertical>

          <FormRowVertical label="Email" error={errors?.email?.message}>
            <Input
              type="text"
              id="email"
              disabled={isWorking}
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
          </FormRowVertical>

          <FormRowVertical
            label="National ID"
            error={errors?.nationalID?.message}
          >
            <Input
              type="text"
              id="nationalID"
              disabled={isWorking}
              {...register("nationalID", {
                required: "This field is required",
              })}
            />
          </FormRowVertical>

          <FormRowVertical
            label="Nationality"
            error={errors?.nationality?.message}
          >
            <Controller
              name="nationality"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={countriesOptionsNationality}
                  disabled={isWorking}
                  {...register("nationality", {
                    required: "This field is required",
                  })}
                />
              )}
            />
          </FormRowVertical>

          <FormRowVertical>
            {/* type is an HTML attribute! */}
            <Button
              variation="secondary"
              type="reset"
              disabled={isWorking}
              onClick={() => onCloseModal?.()}
            >
              Cancel
            </Button>
            <Button disabled={isWorking} type="submit">
              {isUpdateSession ? "Update Guest" : "Create new guest"}
            </Button>
          </FormRowVertical>
        </Form>
      )}
    </>
  );
}

export default CreateGuestForm;
