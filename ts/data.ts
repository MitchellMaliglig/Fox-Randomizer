/* exported data */
interface Fox {
  image: string;
  link: string;
}

interface FoxData {
  title: string;
  notes: string;
  photo: string;
  id: number;
}

interface Data {
  foxes: FoxData[];
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
  localStorage.setItem(foxKey, json);
}

function readData(): Data {
  const json = localStorage.getItem(foxKey);

  if (json !== null) {
    return JSON.parse(json);
  } else {
    return {
      foxes: [] as FoxData[],
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getFox(id: number): FoxData | null {
  for (let i: number = 0; i < data.foxes.length; i++) {
    if (data.foxes[i].id === id) {
      return data.foxes[i];
    }
  }
  return null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function replaceFox(fox: FoxData): void {
  for (let i: number = 0; i < data.foxes.length; i++) {
    if (data.foxes[i].id === fox.id) {
      data.foxes[i] = fox;
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function removeFox(id: number): void {
  for (let i: number = 0; i < data.foxes.length; i++) {
    if (data.foxes[i].id === id) {
      data.foxes.splice(i, 1);
    }
  }
}
