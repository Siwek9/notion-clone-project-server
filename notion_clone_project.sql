-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Lis 05, 2024 at 06:08 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `notion_clone_project`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `notes`
--

CREATE TABLE `notes` (
  `id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `create_time` datetime NOT NULL,
  `modification_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `title`, `content`, `create_time`, `modification_time`) VALUES
('5b2ae185-2c14-4170-a134-d16f560aaadb', 'Przepis na bigos', '\nŹródło: https://aniagotuje.pl/przepis/bigos\n\n# Przepis na bigos\n\n---\n\nZobacz jak smakuje prawdziwy **bigos tradycyjny**. Poznaj mój sprawdzony przepis na bigos z dużą ilością różnych mięs, z suszonymi grzybami, śliwkami i idealnie dobranymi przyprawami. To danie, które Cię zachwyci.\n\n### Czas przygotowania: 2 godziny\n\n### Czas duszenia: 2 dni\n\n### Liczba porcji: 5 kg bigosu\n\n### W 100 g bigosu:\nWartość energetyczna: 190 kcal\n\n### Dieta: bezglutenowa\n\n\n## Składniki:\n\n- 1 kg kapusty świeżej - pół średniej główki\n- 2 kg kapusty kiszonej + 2,5 szklanki wody do gotowania\n- 80 g suszonych grzybów + 500 ml wody do moczenia\n- 500 g łopatki wieprzowej\n- 300 g łopatki wołowej\n- 500 g boczku surowego bez skóry\n- 500 g schabu wieprzowego od karku\n- 50 g smalcu wieprzowego\n- 180 g kiełbasy myśliwskiej podwędzanej\n- 150 g boczku surowego wędzonego\n- 150 g boczku parzonego wędzonego\n- 2 duże cebule - do 400 g\n- 50 g suszonych śliwek bez pestek - lub więcej\n- 1 szklanka czerwonego, wytrawnego wina - można pominąć\n- przyprawy i zioła: 5 ziaren ziela angielskiego, łyżeczka czarnego pieprzu, 5 liści laurowych, 1 goździk, 2 ziarna jałowca\n\n\n## Krok 1: Namocz grzyby\nSzykowanie bigosu zacznij od namoczenia suszonych grzybów. 80 gramów suszonych grzybów, to trochę więcej niż dwie garście grzybków. Suszone grzyby umieść w większym naczyniu i zalej dwiema szklankami zimnej wody... może być woda z kranu. \n\nMiseczkę przykryj np. talerzykiem i odstaw w suche i chłodne miejsce na 12 godzin, a najlepiej na całą noc. Grzyby wchłoną część wody i zmiękną. \n\n## Krok 2: Posiekaj grzyby\nOdcedź grzyby z wody, ale wody nie wylewaj. Wodę z moczenia grzybów dodajemy potem do bigosu. Odcedzone grzyby posiekaj na drobne paski. \n\nKrok 3: Zacznij od kapusty kiszonej\nDwa kilogramy kapusty kiszonej odciśnij dokładnie z wody a następnie posiekaj. Kapustę umieść w garnku. Wlej dwie i pół szklanki zwykłej wody z kranu lub wody filtrowanej (mniej lub więcej, ale tyle, by przykryć wodą kapustę). [Kapusta kiszona](https://aniagotuje.pl/przepis/kapusta-kiszona) z mojego przepisu będzie idealna o bigosu. \n\nPorada: Je nie płuczę kapusty kiszonej, ale odciskam ją ze słono kwaśnej wody. Dla mnie to taki kompromis smakowy. Jeśli wolisz bardziej kwaśny bigos, to nie odciskaj kapusty z wody. Jeśli zaś lubisz bigos bardzo łagodny, to możesz odciśniętą w wody kapustę kiszonką jeszcze dodatkowo przepłukać w zimnej wodzie i raz jeszcze odcisnąć. Zawsze polecam też najpierw sprawdzić smak kiszonej kapusty, bowiem jedne są mniej kwaśne i słone a inne bardziej. \n\n## Krok 4: Dodaj kapustę białą\nMałą główkę białej kapusty lub też pół większej główki (łącznie jeden kilogram) posiekaj i umieść na sitku w zlewie. Sparz kapustę wrzątkiem z czajnika. Sparzoną kapustę umieść w garnku razem z kapustą kiszoną. Garnek przykryj przykrywką. Zagotuj całość a następnie zmniejsz moc palnika do takiej, by kapusty tylko lekko mrugały. Gotuj je tak przez godzinę pod przykrywką. \n\n_Porada_: Jeśli chcesz zrobić bigos wyłącznie z użyciem świeżej kapusty (główka kapusty \"słodkiej\") z pominięciem kapusty kiszonej, to wystarczy, że do bigosu dodasz około jednego kilograma tartych na tarce, kwaśnych i twardych jabłek. Np. na dwa kilogramy kapusty dajemy jeden kilogram jabłek. Jabłka dodajemy wówczas pod koniec szykowania bigosu. \n\n## Krok 5: Przygotuj mięsa\nW trakcie gotowania się kapusty przygotuj mięso. Surowe mięsa pokrój na małe kawałki: 500 g łopatki wieprzowej, 300 g łopatki wołowej, 500 g schabu wieprzowego od karku, 500 g boczku surowego bez skóry. Przygotuj też 50 g smalcu wieprzowego.\n\nIm więcej różnych mięs, tym bogatszy smak bigosu. Jak jednak wspomniałam wcześniej, możesz śmiało zrezygnować nawet z połowy mięs. Wówczas wszystkie inne składniki dajemy w tych samym ilościach. Jeśli zaś masz dostęp do dobrej jakości dziczyzny (mięso z dzika, sarny, kaczki lub zająca), to polecam zrezygnować np. ze schabu wieprzowego, na rzecz dziczyzny. \n\n## Krok 6: Gotuj bigos\nSmalec roztop na dużej patelni a następnie wyłóż też razem wszystkie rodzaje pokrojonego mięsa. Mięso podsmażaj tak na średniej mocy palnika przez 40 minut. Co kilka minut zamieszaj całość przy pomocy drewnianej łyżki. \n\nPo godzinie gotowania kapustę razem z wodą przełóż do bardzo dużego garnka. Dodaj wszystkie przyprawy i zioła: 5 ziaren ziela angielskiego, łyżeczka czarnego pieprzu, 5 liści laurowych, 1 goździk, 2 ziarna jałowca. Wlej też wodę, która została z moczenia grzybów (jeśli nie jest gorzka) oraz dodaj posiekane grzyby. Dokładnie wszystko wymieszaj.\n\nPorada: Do bigosu możesz też śmiało dodać (oprócz wyżej wymienionych przypraw) gotową mieszankę przypraw do bigosu. To dobry sposób na doprawienie bigosu, gdy brakuje nam np. jałowca lub goździków. W gotowych mieszankach zazwyczaj je znajdziecie. Wystarczy jedna saszetka o wadze 20 gramów. Jeśli zaś dysponujesz wyłącznie mieszanką przypraw, to możesz dodać do 40 gramów mieszanki przypraw do bigosu. \n\n## Krok 7: Dodaj mięsa\nKolejno dodaj też podsmażone na patelni mięso. Całość wymieszaj i przykryj przykrywką. Bigos gotuj cały czas na bardzo małej mocy palnika. Mieszaj, by się nie przypalił. \n\n## Krok 8: Podsmaż cebulę z boczkiem\nNa samym końcu przygotuj cebule oraz wędzonki. Potrzebujesz dwie duże cebule, po 150 gramów boczku wędzonego surowego i parzonego oraz 180 g kiełbasy myśliwskiej podwędzanej. W pierwszej kolejności pokrój w kostkę boczek parzony i umieść go na patelni po mięsie. Gdy wytopisz już z boczku tłuszcz dodaj posiekaną cebulę. Po pięciu minutach podsmażania dodaj też pokrojony w kostkę boczek surowy wędzony. Podsmażaj całość dziesięć minut. \n\nPorada: Możesz też użyć wyłącznie kiełbasy a najlepiej po kawałku różnych kiełbas (Kiełbas nie trzeba wcześniej podsmażać... szczególnie tych podsuszanych). Możesz też użyć wyłącznie boczku wędzonego. Całkowicie dozwolone jest też dodanie pokrojonych w kosteczkę kawałków pieczeni, które zostały Ci z poprzednich obiadów np. pieczony schab lub karkówka. \n\n## Krok 9: Dokończ bigos\nPo tym czasie całą zawartość patelni przełóż do garnka z gotującym się bigosem. Kiełbasę pokrój w kostkę i dodaj go bigosu. Posiekaj też drobno minimum 50 gramów suszonych śliwek. Jeśli nie masz śliwek suszonych, to bardzo dobrze sprawdzą się też domowe powidła śliwkowe. Wszystko bardzo dokładnie wymieszaj. \n\nBigos gotuj na minimalnej mocy palnika przez cztery godziny. Jeśli planujesz dodać do bigosu czerwone wino, to zrób to pierwszego lub ostatniego dnia gotowania bigosu. Szklankę dobrego czerwonego wina lub też madery wlej do bigosu zaraz po dodaniu ostatnich składników lub też na dwie godziny przed wyłączeniem bigosu w dniu w którym chcesz go podać. \n\nPrzynajmniej co 30 minut zaglądaj do bigosu i mieszaj go przy pomocy drewnianej łyżki, bowiem bigos lubi się przypalać. Następnego dnia ponownie podgrzewaj bigos przez przynajmniej dwie godziny. Bigos gotowy jest do jedzenia już pierwszego dnia, jednak podgrzewany drugiego lub nawet trzeciego, czy czwartego dnia robi się coraz lepszy.\n\nPod koniec gotowania bigosu można też dodać przecier pomidorowy, jednak kuchnia staropolska nie znała kiedyś takiego dodatku. Ja przecieru nie dodaję, ale jeśli macie ochotę, to możecie wzbogacić smak bigosu o kila łyżek przecieru lub koncentratu z pomidorów, czy też posiekanych świeżych pomidorów bez skórki. \n\nJeśli lubisz bardziej tłusty bigos, to śmiało.. dodaj więcej dobrej jakości smalcu wieprzowego lub też smalcu z gęsi. W razie potrzeby dodaj też do bigosu trochę soli lub też pieprzu, czy cukru. Jest jeszcze kwestia sporna, czyli szykowanie zasmażki do bigosu. Według mnie nie ma takiej potrzeby. Bogaty w składniki i długo duszony bigos będzie gęsty i zawiesisty bez zasmażki. \n\n**Bigos** polecam podawać bardzo gorący. Domowy bigos najlepiej smakuje z ciemnym pieczywem, ziemniakami oraz różnymi kluskami z ziemniaków. Koniecznie piszcie jakie są Wasze sprawdzone sposoby na pyszny bigos oraz smaczny sposób podania.\nPowodzenia!\n\n', '2024-11-05 14:37:03', '2024-11-05 14:37:03'),
('69889cc7-2d82-4a0d-8f02-805397c2a85b', 'Przepis na bigos', '\nŹródło: https://aniagotuje.pl/przepis/bigos\n\n# Przepis na bigos\n\n---\n\nZobacz jak smakuje prawdziwy **bigos tradycyjny**. Poznaj mój sprawdzony przepis na bigos z dużą ilością różnych mięs, z suszonymi grzybami, śliwkami i idealnie dobranymi przyprawami. To danie, które Cię zachwyci.\n\n### Czas przygotowania: 2 godziny\n\n### Czas duszenia: 2 dni\n\n### Liczba porcji: 5 kg bigosu\n\n### W 100 g bigosu:\nWartość energetyczna: 190 kcal\n\n### Dieta: bezglutenowa\n\n\n## Składniki:\n\n- 1 kg kapusty świeżej - pół średniej główki\n- 2 kg kapusty kiszonej + 2,5 szklanki wody do gotowania\n- 80 g suszonych grzybów + 500 ml wody do moczenia\n- 500 g łopatki wieprzowej\n- 300 g łopatki wołowej\n- 500 g boczku surowego bez skóry\n- 500 g schabu wieprzowego od karku\n- 50 g smalcu wieprzowego\n- 180 g kiełbasy myśliwskiej podwędzanej\n- 150 g boczku surowego wędzonego\n- 150 g boczku parzonego wędzonego\n- 2 duże cebule - do 400 g\n- 50 g suszonych śliwek bez pestek - lub więcej\n- 1 szklanka czerwonego, wytrawnego wina - można pominąć\n- przyprawy i zioła: 5 ziaren ziela angielskiego, łyżeczka czarnego pieprzu, 5 liści laurowych, 1 goździk, 2 ziarna jałowca\n\n\n## Krok 1: Namocz grzyby\nSzykowanie bigosu zacznij od namoczenia suszonych grzybów. 80 gramów suszonych grzybów, to trochę więcej niż dwie garście grzybków. Suszone grzyby umieść w większym naczyniu i zalej dwiema szklankami zimnej wody... może być woda z kranu. \n\nMiseczkę przykryj np. talerzykiem i odstaw w suche i chłodne miejsce na 12 godzin, a najlepiej na całą noc. Grzyby wchłoną część wody i zmiękną. \n\n## Krok 2: Posiekaj grzyby\nOdcedź grzyby z wody, ale wody nie wylewaj. Wodę z moczenia grzybów dodajemy potem do bigosu. Odcedzone grzyby posiekaj na drobne paski. \n\nKrok 3: Zacznij od kapusty kiszonej\nDwa kilogramy kapusty kiszonej odciśnij dokładnie z wody a następnie posiekaj. Kapustę umieść w garnku. Wlej dwie i pół szklanki zwykłej wody z kranu lub wody filtrowanej (mniej lub więcej, ale tyle, by przykryć wodą kapustę). [Kapusta kiszona](https://aniagotuje.pl/przepis/kapusta-kiszona) z mojego przepisu będzie idealna o bigosu. \n\nPorada: Je nie płuczę kapusty kiszonej, ale odciskam ją ze słono kwaśnej wody. Dla mnie to taki kompromis smakowy. Jeśli wolisz bardziej kwaśny bigos, to nie odciskaj kapusty z wody. Jeśli zaś lubisz bigos bardzo łagodny, to możesz odciśniętą w wody kapustę kiszonką jeszcze dodatkowo przepłukać w zimnej wodzie i raz jeszcze odcisnąć. Zawsze polecam też najpierw sprawdzić smak kiszonej kapusty, bowiem jedne są mniej kwaśne i słone a inne bardziej. \n\n## Krok 4: Dodaj kapustę białą\nMałą główkę białej kapusty lub też pół większej główki (łącznie jeden kilogram) posiekaj i umieść na sitku w zlewie. Sparz kapustę wrzątkiem z czajnika. Sparzoną kapustę umieść w garnku razem z kapustą kiszoną. Garnek przykryj przykrywką. Zagotuj całość a następnie zmniejsz moc palnika do takiej, by kapusty tylko lekko mrugały. Gotuj je tak przez godzinę pod przykrywką. \n\n_Porada_: Jeśli chcesz zrobić bigos wyłącznie z użyciem świeżej kapusty (główka kapusty \"słodkiej\") z pominięciem kapusty kiszonej, to wystarczy, że do bigosu dodasz około jednego kilograma tartych na tarce, kwaśnych i twardych jabłek. Np. na dwa kilogramy kapusty dajemy jeden kilogram jabłek. Jabłka dodajemy wówczas pod koniec szykowania bigosu. \n\n## Krok 5: Przygotuj mięsa\nW trakcie gotowania się kapusty przygotuj mięso. Surowe mięsa pokrój na małe kawałki: 500 g łopatki wieprzowej, 300 g łopatki wołowej, 500 g schabu wieprzowego od karku, 500 g boczku surowego bez skóry. Przygotuj też 50 g smalcu wieprzowego.\n\nIm więcej różnych mięs, tym bogatszy smak bigosu. Jak jednak wspomniałam wcześniej, możesz śmiało zrezygnować nawet z połowy mięs. Wówczas wszystkie inne składniki dajemy w tych samym ilościach. Jeśli zaś masz dostęp do dobrej jakości dziczyzny (mięso z dzika, sarny, kaczki lub zająca), to polecam zrezygnować np. ze schabu wieprzowego, na rzecz dziczyzny. \n\n## Krok 6: Gotuj bigos\nSmalec roztop na dużej patelni a następnie wyłóż też razem wszystkie rodzaje pokrojonego mięsa. Mięso podsmażaj tak na średniej mocy palnika przez 40 minut. Co kilka minut zamieszaj całość przy pomocy drewnianej łyżki. \n\nPo godzinie gotowania kapustę razem z wodą przełóż do bardzo dużego garnka. Dodaj wszystkie przyprawy i zioła: 5 ziaren ziela angielskiego, łyżeczka czarnego pieprzu, 5 liści laurowych, 1 goździk, 2 ziarna jałowca. Wlej też wodę, która została z moczenia grzybów (jeśli nie jest gorzka) oraz dodaj posiekane grzyby. Dokładnie wszystko wymieszaj.\n\nPorada: Do bigosu możesz też śmiało dodać (oprócz wyżej wymienionych przypraw) gotową mieszankę przypraw do bigosu. To dobry sposób na doprawienie bigosu, gdy brakuje nam np. jałowca lub goździków. W gotowych mieszankach zazwyczaj je znajdziecie. Wystarczy jedna saszetka o wadze 20 gramów. Jeśli zaś dysponujesz wyłącznie mieszanką przypraw, to możesz dodać do 40 gramów mieszanki przypraw do bigosu. \n\n## Krok 7: Dodaj mięsa\nKolejno dodaj też podsmażone na patelni mięso. Całość wymieszaj i przykryj przykrywką. Bigos gotuj cały czas na bardzo małej mocy palnika. Mieszaj, by się nie przypalił. \n\n## Krok 8: Podsmaż cebulę z boczkiem\nNa samym końcu przygotuj cebule oraz wędzonki. Potrzebujesz dwie duże cebule, po 150 gramów boczku wędzonego surowego i parzonego oraz 180 g kiełbasy myśliwskiej podwędzanej. W pierwszej kolejności pokrój w kostkę boczek parzony i umieść go na patelni po mięsie. Gdy wytopisz już z boczku tłuszcz dodaj posiekaną cebulę. Po pięciu minutach podsmażania dodaj też pokrojony w kostkę boczek surowy wędzony. Podsmażaj całość dziesięć minut. \n\nPorada: Możesz też użyć wyłącznie kiełbasy a najlepiej po kawałku różnych kiełbas (Kiełbas nie trzeba wcześniej podsmażać... szczególnie tych podsuszanych). Możesz też użyć wyłącznie boczku wędzonego. Całkowicie dozwolone jest też dodanie pokrojonych w kosteczkę kawałków pieczeni, które zostały Ci z poprzednich obiadów np. pieczony schab lub karkówka. \n\n## Krok 9: Dokończ bigos\nPo tym czasie całą zawartość patelni przełóż do garnka z gotującym się bigosem. Kiełbasę pokrój w kostkę i dodaj go bigosu. Posiekaj też drobno minimum 50 gramów suszonych śliwek. Jeśli nie masz śliwek suszonych, to bardzo dobrze sprawdzą się też domowe powidła śliwkowe. Wszystko bardzo dokładnie wymieszaj. \n\nBigos gotuj na minimalnej mocy palnika przez cztery godziny. Jeśli planujesz dodać do bigosu czerwone wino, to zrób to pierwszego lub ostatniego dnia gotowania bigosu. Szklankę dobrego czerwonego wina lub też madery wlej do bigosu zaraz po dodaniu ostatnich składników lub też na dwie godziny przed wyłączeniem bigosu w dniu w którym chcesz go podać. \n\nPrzynajmniej co 30 minut zaglądaj do bigosu i mieszaj go przy pomocy drewnianej łyżki, bowiem bigos lubi się przypalać. Następnego dnia ponownie podgrzewaj bigos przez przynajmniej dwie godziny. Bigos gotowy jest do jedzenia już pierwszego dnia, jednak podgrzewany drugiego lub nawet trzeciego, czy czwartego dnia robi się coraz lepszy.\n\nPod koniec gotowania bigosu można też dodać przecier pomidorowy, jednak kuchnia staropolska nie znała kiedyś takiego dodatku. Ja przecieru nie dodaję, ale jeśli macie ochotę, to możecie wzbogacić smak bigosu o kila łyżek przecieru lub koncentratu z pomidorów, czy też posiekanych świeżych pomidorów bez skórki. \n\nJeśli lubisz bardziej tłusty bigos, to śmiało.. dodaj więcej dobrej jakości smalcu wieprzowego lub też smalcu z gęsi. W razie potrzeby dodaj też do bigosu trochę soli lub też pieprzu, czy cukru. Jest jeszcze kwestia sporna, czyli szykowanie zasmażki do bigosu. Według mnie nie ma takiej potrzeby. Bogaty w składniki i długo duszony bigos będzie gęsty i zawiesisty bez zasmażki. \n\n**Bigos** polecam podawać bardzo gorący. Domowy bigos najlepiej smakuje z ciemnym pieczywem, ziemniakami oraz różnymi kluskami z ziemniaków. Koniecznie piszcie jakie są Wasze sprawdzone sposoby na pyszny bigos oraz smaczny sposób podania.\nPowodzenia!\n\n', '2024-11-05 16:41:15', '2024-11-05 16:41:15');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_picture` varchar(20) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `profile_picture`, `description`) VALUES
(1, 'Admin', 'admin@admin.pl', 'bdd2297f93550f01452cbd838c276f0dd22f498b4661394f1528ab88d6e63e6f', '', ''),
(2, 'Siwek9', 'siwek9@siwek9.com', 'bdd2297f93550f01452cbd838c276f0dd22f498b4661394f1528ab88d6e63e6f', '', ''),
(25, 'Lolek', 'lolek@lolowski.pl', 'bdd2297f93550f01452cbd838c276f0dd22f498b4661394f1528ab88d6e63e6f', '', '');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_note_relations`
--

CREATE TABLE `user_note_relations` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_note` varchar(255) NOT NULL,
  `owner` tinyint(1) NOT NULL,
  `can_modify` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_note_relations`
--

INSERT INTO `user_note_relations` (`id`, `id_user`, `id_note`, `owner`, `can_modify`) VALUES
(1, 24, '5b2ae185-2c14-4170-a134-d16f560aaadb', 1, 1),
(2, 25, '69889cc7-2d82-4a0d-8f02-805397c2a85b', 1, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user_session`
--

CREATE TABLE `user_session` (
  `session_id` varchar(255) NOT NULL,
  `ip_address` varchar(15) NOT NULL,
  `user_id` int(11) NOT NULL,
  `expiration_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_session`
--

INSERT INTO `user_session` (`session_id`, `ip_address`, `user_id`, `expiration_date`) VALUES
('13c76038-f92b-43b2-8479-448747172a55', '127.0.0.1', 25, '2024-11-06 16:41:15');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `user_note_relations`
--
ALTER TABLE `user_note_relations`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `user_session`
--
ALTER TABLE `user_session`
  ADD PRIMARY KEY (`session_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `user_note_relations`
--
ALTER TABLE `user_note_relations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
