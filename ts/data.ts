/* exported data */
interface Fox {
  image: string;
  link: string;
}

interface FoxData {
  title: string;
  notes: string;
  photo: string;
}

interface Data {
  foxes: Map<number, FoxData>;
  editingId: number;
  nextId: number;
}

const foxKey = 'fox-key';

const data: Data = readData();

const messages = [
  'Cute!',
  'Adorable!',
  'Lovely!',
  'Oh dear, I really like this one!',
  'So very fluffy!',
  'Amazing!',
  'Great!',
  "We've got a good one right here!",
  'This one makes me happy...',
] as string[];

const saved = ['Great choice!', 'Excellent choice!', 'Good taste!'] as string[];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function writeData(): void {
  const json = JSON.stringify(data);

  const foxesJson = JSON.stringify(Array.from(data.foxes.entries()));
  const completeJson = json.replace(`"foxes":{}`, `"foxes":${foxesJson}`);

  localStorage.setItem(foxKey, completeJson);
}

function readData(): Data {
  const json = localStorage.getItem(foxKey);

  if (json !== null) {
    const jsonParse = JSON.parse(json);
    jsonParse.foxes = new Map(jsonParse.foxes);

    return jsonParse;
  } else {
    return {
      foxes: new Map<number, FoxData>(),
      editingId: -1,
      nextId: 1,
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getMessage(): string {
  return `"${messages[Math.floor(Math.random() * messages.length)]}"`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSaved(): string {
  return `"${saved[Math.floor(Math.random() * saved.length)]}"`;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function fetchFox(): Promise<string | null> {
  try {
    const response = await fetch('https://randomfox.ca/floof/');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const fox = (await response.json()) as Fox;

    return fox.image;
  } catch (error) {
    console.error('Error:', error);
  }

  return null;
}
