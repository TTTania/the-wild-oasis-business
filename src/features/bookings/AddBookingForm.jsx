import { Controller, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Checkbox from "../../ui/Checkbox";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useCabins } from "../cabins/useCabins";
import Select from "../../ui/Select";
import Spinner from "../../ui/Spinner";
import { useDatePicker } from "../../hooks/useDatePicker";
import { DayPicker } from "react-day-picker";
import {
  eachDayOfInterval,
  endOfDay,
  format,
  isBefore,
  isValid,
  parseISO,
  startOfToday,
} from "date-fns";
import { useGetBookedDaysByCabin } from "./useGetBookedDaysByCabin";
import { modifiersStylesDatePicker } from "../../utils/constants";
import FooterDatePicker from "../../ui/FooterDatePicker";
import { formatCurrency, subtractDates } from "../../utils/helpers";
import { useSettings } from "../settings/useSettings";
import { useAvailability } from "./useAvailability";
import MessageAvailable from "./MessageAvailable";
import FormRowVertical from "../../ui/FormRowVertical";
import Textarea from "../../ui/Textarea";
import { useAllGuests } from "../guests/useAllGuests";
import ButtonGroup from "../../ui/ButtonGroup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateBooking } from "./useCreateBooking";

function AddBookingForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      cabinId: "",
      startDate: "",
      endDate: "",
      guestId: "",
      numGuests: 1,
      numNights: 0,
      cabinPrice: 0,
      discount: 0,
      observations: "",
      extrasPrice: 0,
      totalPrice: 0,
      hasBreakfast: false,
      isPaid: false,
    },
  });

  useEffect(() => {
    reset({
      cabinId: "",
      numGuests: 1,
      startDate: "",
      endDate: "",
      hasBreakfast: false,
      isPaid: false,
    });
  }, [reset]);

  //1. Select Cabin, get booked dates
  const { cabins, isLoading: isLoadingCabins } = useCabins();
  const { createBooking, isLoading: isCreating } = useCreateBooking();
  const prepareCabinOptions = cabins?.map((cabin) => ({
    value: cabin.id,
    label: `${cabin.name} (max ${cabin.maxCapacity} guests)`,
  }));

  const cabinOptions = [{ value: "", label: "Select a Cabin" }].concat(
    prepareCabinOptions
  );

  const cabinIdInput = watch("cabinId");
  // console.log("cabinIdInput:", cabinIdInput);
  const startDateInput = watch("startDate");
  const endDateInput = watch("endDate");

  const { isLoadingBookedDates, bookedDatesForCabin } = useGetBookedDaysByCabin(
    Number(cabinIdInput)
  );

  const cabinInput = cabins?.find(
    (cabinInput) => cabinInput.id === Number(cabinIdInput)
  );

  //2. Select Date
  const { range, setRange, handleDayClick, handleResetRange } = useDatePicker();

  const { settings, isLoading: isLoadingSettings } = useSettings();

  const { guests, isLoading: isLoadingGuests } = useAllGuests();

  //3. Check availability
  const { availability } = useAvailability(
    cabinIdInput,
    startDateInput,
    endDateInput
  );
  const { isAvailable } = availability;
  //4. Select Guest

  //5. other booking information

  const numGuestInput = watch("numGuests");
  const hasBreakfast = watch("hasBreakfast");
  const isPaid = watch("isPaid");

  const cabinIdNum = Number(cabinIdInput);
  const numNightsInput =
    startDateInput && endDateInput && endDateInput > startDateInput
      ? subtractDates(endDateInput, startDateInput)
      : 0;

  if (
    isLoadingCabins ||
    isLoadingBookedDates ||
    isLoadingSettings ||
    isLoadingGuests
  )
    return <Spinner />;

  const guestOptions = [
    { value: "", label: "Select a Guest" },
    ...guests
      .sort((a, b) => a.fullName.localeCompare(b.fullName))
      .map((guest) => ({
        value: guest.id,
        label: guest.fullName,
      })),
  ];

  const numGuestOptions = [
    { value: "", label: "Select a number" },
    ...Array.from({ length: cabinInput?.maxCapacity }, (_, i) => ({
      value: i + 1,
      label: `${i + 1} guest${i > 0 ? "s" : ""}`,
    })),
  ];

  const cabinPriceInput = cabinInput
    ? cabinInput.regularPrice * numNightsInput
    : 0;

  const discountInput = cabinInput ? cabinInput.discount * numNightsInput : 0;

  const extrasPriceInput = hasBreakfast
    ? numNightsInput * settings.breakfastPrice * Number(numGuestInput)
    : 0;

  const totalPriceInput =
    numNightsInput > 0 ? cabinPriceInput + extrasPriceInput - discountInput : 0;

  //render logic and submit function
  const bookingValidation = {
    cabinId: {
      required: "Cabin is required",
    },

    startDate: {
      required: "Check in date is required",
      validate: {
        isValidDate: (value) => isValid(parseISO(value)) || "Invalid date",
        isFutureDate: (value) =>
          isBefore(value, startOfToday())
            ? "Check in cannot before today"
            : true,
      },
    },

    endDate: {
      required: "Check out date is required",
      validate: {
        isValidDate: (value) => isValid(parseISO(value)) || "Invalid date",

        isAfterStartDate: (value) => {
          return (
            !isBefore(parseISO(value), parseISO(getValues("startDate"))) ||
            "Check out cannot be before check in"
          );
        },

        isSameDate: (value) => {
          return (
            parseISO(value).getTime() !==
              parseISO(getValues("startDate")).getTime() ||
            "Check out cannot be the same date as check in"
          );
        },
        isMinBookingLength: (value) => {
          return subtractDates(value, getValues("startDate")) >=
            settings?.minBookingLength
            ? true
            : `Minimum number of nights per booking is ${settings?.minBookingLength}`;
        },

        ismaxBookingLength: (value) => {
          return subtractDates(value, getValues("startDate")) <=
            settings?.maxBookingLength
            ? true
            : `Maximum number of nights per booking is ${settings?.maxBookingLength}`;
        },
      },
    },

    guestId: { required: "Guest information is required" },

    numGuests: {
      required: "Number of guests is required",
      min: {
        value: 1,
        message: "Minimum number of guests must be 1",
      },
      max: {
        value: cabinInput?.maxCapacity,
        message: `Maximum number of guests must be ${cabinInput?.maxCapacity}`,
      },
    },
  };

  function handleReset() {
    reset();
    navigate("/bookings/");
    handleResetRange();
  }

  function onSubmit(data) {
    const cabinIdNum = Number(data.cabinId);
    const reservedCabin = cabins.find((cabin) => cabin.id === cabinIdNum);

    const cabinPrice =
      (reservedCabin.regularPrice - reservedCabin.discount) * numNightsInput;

    const extrasPrice =
      numNightsInput * settings.breakfastPrice * Number(numGuestInput);

    const totalPrice = cabinPrice + extrasPrice;

    const finalData = {
      ...data,
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
      numNights: numNightsInput,
      numGuests: Number(data.numGuests),
      cabinId: Number(data.cabinId),
      guestId: Number(data.guestId),
      observations: data.observations,
      hasBreakfast,
      isPaid,
      cabinPrice,
      extrasPrice,
      totalPrice,
      status: "unconfirmed",
    };

    createBooking(finalData, {
      onSuccess: () => {
        handleReset();
      },
    });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form $type="modal" onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin">
        <Controller
          name="cabinId"
          control={control}
          rules={bookingValidation.cabinId}
          render={({ field }) => <Select {...field} options={cabinOptions} />}
        />
      </FormRow>

      <FormRow flex="datepicker" label="Booking dates">
        <Controller
          name="startDate"
          id="startDate"
          rules={bookingValidation.startDate}
          control={control}
          render={({ field }) => <input {...field} type="hidden" />}
        />
        <Controller
          name="endDate"
          id="endDate"
          rules={bookingValidation.endDate}
          control={control}
          render={({ field }) => <input {...field} type="hidden" />}
        />
        <DayPicker
          mode="range"
          selected={range}
          modifiers={{ booked: bookedDatesForCabin }}
          modifiersStyles={modifiersStylesDatePicker}
          disabled={bookedDatesForCabin?.map((date) => ({
            from: new Date(date),
            to: new Date(date),
          }))}
          // onDayClick={handleDayClick}
          onSelect={(range) => {
            setRange(range);
            setValue(
              "startDate",
              range?.from ? format(range?.from, "yyyy-MM-dd") : ""
            );
            setValue(
              "endDate",
              range?.to ? format(range?.to, "yyyy-MM-dd") : ""
            );
          }}
          footer={<FooterDatePicker range={range} />}
        />
      </FormRow>

      <MessageAvailable
        cabinIdInput={cabinIdInput}
        startDateInput={startDateInput}
        endDateInput={endDateInput}
      />

      {isAvailable ? (
        <>
          <FormRow label="Guest Name" error={errors?.guestId?.message}>
            <Controller
              name="guestId"
              control={control}
              rules={bookingValidation.guestId}
              render={({ field }) => (
                <Select
                  {...field}
                  options={guestOptions}
                  // disabled={isCreating}
                />
              )}
            />
          </FormRow>

          <FormRow label="Number of Guests" error={errors?.numGuests?.message}>
            <Controller
              name="numGuests"
              control={control}
              rules={bookingValidation.numGuests}
              render={({ field }) => (
                <Select
                  {...field}
                  options={numGuestOptions}
                  // disabled={isCreating}
                />
              )}
            />
          </FormRow>

          <FormRow label="Number of Nights">
            <Input disabled value={numNightsInput} />
          </FormRow>

          <FormRow label="Cabin Price">
            <Input disabled value={formatCurrency(cabinPriceInput)} />
          </FormRow>

          <FormRow label="Discount">
            <Input disabled value={formatCurrency(discountInput)} />
          </FormRow>

          <FormRow label="Extras Price">
            <Input disabled value={formatCurrency(extrasPriceInput)} />
          </FormRow>
          <FormRow label="Total Price">
            <Input disabled value={formatCurrency(totalPriceInput)} />
          </FormRow>
          <FormRow label="Observations">
            <Textarea id="observations" {...register("observations")} />
          </FormRow>
          <FormRowVertical>
            <Controller
              control={control}
              name="hasBreakfast"
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  id="hasBreakfast"
                  // disabled={isCreating}
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                >
                  Includes breakfast?
                </Checkbox>
              )}
            />

            <Controller
              control={control}
              name="isPaid"
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  id="isPaid"
                  // disabled={isCreating}
                  checked={value}
                  onChange={(e) => onChange(e.target.checked)}
                >
                  Was paid?
                </Checkbox>
              )}
            />
          </FormRowVertical>

          <FormRow>
            <ButtonGroup>
              <Button variation="secondary" type="reset" onClick={handleReset}>
                Cancel
              </Button>
              <Button
                // disabled={isCreating}
                type="submit"
                variation="primary"
              >
                Create Booking
              </Button>
            </ButtonGroup>
          </FormRow>
        </>
      ) : (
        <></>
      )}
    </Form>
  );
}

export default AddBookingForm;
