
CREATE TABLE IF NOT EXISTS t_p25510910_new_moms_support.specialists (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  img TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p25510910_new_moms_support.meetings (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  meet_date TEXT NOT NULL,
  meet_day TEXT NOT NULL,
  format TEXT NOT NULL DEFAULT 'Онлайн',
  spots TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO t_p25510910_new_moms_support.specialists (name, role, tags, img) VALUES
('Анна Соколова', 'Психолог · 8 лет опыта', ARRAY['Тревога','Послеродовая депрессия','Отношения'], 'https://cdn.poehali.dev/projects/72c4f6fe-eb94-498b-af59-11458089f6fa/files/447f914d-f167-4b8b-9c17-ed7442e5f27d.jpg'),
('Мария Лебедева', 'Педиатр · 12 лет опыта', ARRAY['Здоровье ребёнка','Питание','Режим'], 'https://cdn.poehali.dev/projects/72c4f6fe-eb94-498b-af59-11458089f6fa/files/447f914d-f167-4b8b-9c17-ed7442e5f27d.jpg'),
('Елена Войнова', 'Нутрициолог · 6 лет опыта', ARRAY['Питание мамы','Восстановление','Энергия'], 'https://cdn.poehali.dev/projects/72c4f6fe-eb94-498b-af59-11458089f6fa/files/447f914d-f167-4b8b-9c17-ed7442e5f27d.jpg');

INSERT INTO t_p25510910_new_moms_support.meetings (title, meet_date, meet_day, format, spots) VALUES
('Тема: Послеродовое восстановление', '25 апр', 'Пятница', 'Онлайн', '12 мест'),
('Живая встреча в Москве', '10 мая', 'Суббота', 'Офлайн', '20 мест'),
('Вебинар: Детские страхи', '22 мая', 'Четверг', 'Онлайн', 'Без ограничений');
