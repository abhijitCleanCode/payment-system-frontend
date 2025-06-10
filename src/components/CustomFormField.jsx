import { useState } from "react";

import { FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent } from "./ui/select";
import { Eye, EyeOff } from "lucide-react";

const FormFieldType = {
  INPUT: "input",
  TEXTAREA: "textarea",
  PHONE_INPUT: "phoneInput",
  CHECKBOX: "checkbox",
  DATE_PICKER: "datePicker",
  SELECT: "select",
  SKELETON: "skeleton",
};
// render all different kinds of field depending on the form field type
const RenderField = ({ field, props }) => {
  const { fieldType, IconComponent, iconAlt, placeholder, type } = props;
  const [showPassword, setShowPassword] = useState(false);

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex items-center rounded-md border border-dark-700">
          {IconComponent && (
            <IconComponent
              height={24}
              width={24}
              className="ml-2"
              color="#76828D"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              type={showPassword ? "text" : type}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
          {type === "password" && (
            <Button
              variant="ghost"
              className="mr-2 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={20} color="#76828D" />
              ) : (
                <Eye size={20} color="#76828D" />
              )}
            </Button>
          )}
        </div>
      );
    case FormFieldType.TEXTAREA:
      return <div>TextArea</div>;
    case FormFieldType.PHONE_INPUT:
      return <div>Phone Input</div>;
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>

            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
          </div>
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return <div>Date Picker</div>;
    default:
      break;
  }
};

const CustomFormField = (props) => {
  const { control, fieldType, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="shad-input-label">{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
