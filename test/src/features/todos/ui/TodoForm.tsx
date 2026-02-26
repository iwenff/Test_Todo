import { useState, type FormEvent } from "react";
import { Input } from "../../../shared/ui/Input";
import { Button } from "../../../shared/ui/Button";

interface TodoFormProps {
  onSubmit: (title: string) => Promise<void> | void;
  isSubmitting: boolean;
}

export const TodoForm: React.FC<TodoFormProps> = ({
  onSubmit,
  isSubmitting,
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const trimmed = value.trim();

    if (!trimmed) {
      setError("Введите текст задачи");
      return;
    }
    if (trimmed.length > 200) {
      setError("Слишком длинный текст (максимум 200 символов)");
      return;
    }

    setError(null);
    await onSubmit(trimmed);
    setValue("");
  };

  return (
    <form
      className="todo-form"
      onSubmit={handleSubmit}
      aria-label="Добавить задачу"
    >
      <div className="todo-form-main">
        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Что нужно сделать?"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "todo-title-error" : undefined}
        />
        <Button type="submit" disabled={isSubmitting}>
          Добавить
        </Button>
      </div>
      {error && (
        <p id="todo-title-error" className="field-error" aria-live="polite">
          {error}
        </p>
      )}
    </form>
  );
};
