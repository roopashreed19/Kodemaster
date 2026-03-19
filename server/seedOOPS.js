const mongoose = require('mongoose');
require('dotenv').config();

const oopsSchema = new mongoose.Schema({
  topicId: String,
  title: String,
  conceptTitle: String,
  realWorldScenario: String,
  technicalDeepDive: String,
  questions: [{
    id: String,
    questionText: String,
    options: [String],
    correctAnswer: String,
    explanation: String
  }]
});

const OOPSArena = mongoose.model('OOPSArenaSeed', oopsSchema, 'oops_quests');

const oopsData = [
  {
    topicId: "classes-objects",
    title: "The Blueprint Vault",
    conceptTitle: "Classes & Objects",
    realWorldScenario: "Think of a Class as the architectural blueprint for a house. It defines where the walls, doors, and windows go (properties) and what the house can do (methods like 'turn on lights'). An Object is the actual, physical house built from that blueprint. You can build many houses (Objects) from one blueprint (Class).",
    technicalDeepDive: "A Class is a user-defined data type consisting of data members and member functions. An Object is an instance of a Class that allocates memory and holds specific state.",
    questions: [
      { id: "oops1", questionText: "What describes a blueprint for creating objects?", options: ["Method", "Class", "Constructor", "Variable"], correctAnswer: "Class", explanation: "A class defines the properties and behaviors that objects created from it will have." },
      { id: "oops2", questionText: "An instance of a class is called an...?", options: ["Attribute", "Object", "Element", "Action"], correctAnswer: "Object", explanation: "Objects are concrete entities created based on the class schema." },
      { id: "oops3", questionText: "Which special method is automatically called when an object is created?", options: ["Destructor", "Main", "Constructor", "Initializer"], correctAnswer: "Constructor", explanation: "Constructors initialize the newly created object." },
      { id: "oops4", questionText: "Variables defined inside a class are generally called?", options: ["Global variables", "Pointers", "Attributes / Properties", "Local variables"], correctAnswer: "Attributes / Properties", explanation: "They dictate the state or characteristics of the object." },
      { id: "oops5", questionText: "Functions defined inside a class are known as?", options: ["Methods", "Procedures", "Attributes", "Loops"], correctAnswer: "Methods", explanation: "Methods define the behavior of the class/object." }
    ]
  },
  {
    topicId: "encapsulation",
    title: "The Locked Chest",
    conceptTitle: "Encapsulation",
    realWorldScenario: "Imagine taking a capsule (pill). The medicine is safely bundled inside the protective coating. You don't need to know the exact chemicals touching your tongue; you just swallow it. Encapsulation hides the internal state of an object and only allows interaction through specific methods (like getters/setters).",
    technicalDeepDive: "Encapsulation is the bundling of data with the methods that operate on that data, while restricting direct access to some of an object's components.",
    questions: [
      { id: "oops6", questionText: "What is the main purpose of Encapsulation?", options: ["Code reuse", "Data hiding and protection", "Creating multiple objects", "Faster execution"], correctAnswer: "Data hiding and protection", explanation: "It prevents external code from arbitrarily changing internal states." },
      { id: "oops7", questionText: "Which access modifier completely restricts access from outside the class?", options: ["Public", "Protected", "Private", "Default"], correctAnswer: "Private", explanation: "Private members can only be accessed within the same class." },
      { id: "oops8", questionText: "How do we usually access private data safely?", options: ["Pointers", "Direct assignment", "Getters and Setters", "Inheritance"], correctAnswer: "Getters and Setters", explanation: "These methods provide controlled access to private variables." },
      { id: "oops9", questionText: "Encapsulation is often achieved by declaring class variables as _____?", options: ["Private", "Public", "Static", "Constant"], correctAnswer: "Private", explanation: "Making variables private forces developers to use public methods to interact with them." },
      { id: "oops10", questionText: "Which real-world object best represents encapsulation?", options: ["A clear glass", "An ATM machine", "A public park", "A billboard"], correctAnswer: "An ATM machine", explanation: "An ATM hides all the complex banking logic and money; you only interact with the keypad." }
    ]
  },
  {
    topicId: "inheritance",
    title: "The Ancestral Tree",
    conceptTitle: "Inheritance",
    realWorldScenario: "Just like you inherit physical traits (like eye color) and assets from your parents, a child class can inherit properties and behaviors from a parent class. A 'Car' inherits from a 'Vehicle'—it still drives and has wheels, but adds specifics like 'doors' and 'air conditioning'.",
    technicalDeepDive: "Inheritance is a mechanism wherein a new class is derived from an existing class, promoting code reusability and establishing an 'IS-A' relationship.",
    questions: [
      { id: "oops11", questionText: "Which relationship type does Inheritance represent?", options: ["HAS-A", "USES-A", "IS-A", "PART-OF"], correctAnswer: "IS-A", explanation: "For example, a Dog IS-A Animal." },
      { id: "oops12", questionText: "What is the class being inherited from called?", options: ["Subclass", "Base/Super class", "Derived class", "Child class"], correctAnswer: "Base/Super class", explanation: "The base class provides the foundational characteristics." },
      { id: "oops13", questionText: "If Class B inherits from Class A, Class B is the...?", options: ["Parent Class", "Interface", "Super Class", "Derived/Subclass"], correctAnswer: "Derived/Subclass", explanation: "Class B derives its properties from Class A." },
      { id: "oops14", questionText: "Which of the following is NOT a type of inheritance typically supported directly in Java/C#?", options: ["Single", "Multilevel", "Multiple (with classes)", "Hierarchical"], correctAnswer: "Multiple (with classes)", explanation: "Java/C# do not support multiple inheritance with classes to avoid the Diamond Problem (though they use Interfaces)." },
      { id: "oops15", questionText: "What is the primary benefit of Inheritance?", options: ["Data Hiding", "Polymorphism", "Memory saving", "Code Reusability"], correctAnswer: "Code Reusability", explanation: "You don't have to rewrite the same properties all over again for related objects." }
    ]
  },
  {
    topicId: "polymorphism",
    title: "The Shapeshifter",
    conceptTitle: "Polymorphism",
    realWorldScenario: "Polymorphism means 'many forms'. Think of a universal 'Play' button. If you press Play on an Audio Player, it plays music. If you press Play on a Video Player, it plays a movie. The action ('Play') is the same, but the behavior changes based on the object receiving the command.",
    technicalDeepDive: "Polymorphism allows objects of different classes to be treated as objects of a common superclass. It is primarily achieved through method overriding (runtime) and method overloading (compile-time).",
    questions: [
      { id: "oops16", questionText: "What does Polymorphism literally mean?", options: ["Many shapes/forms", "Single inheritance", "Data hiding", "Object linking"], correctAnswer: "Many shapes/forms", explanation: "Poly = many, morph = forms." },
      { id: "oops17", questionText: "Having multiple methods with the same name but different parameters in the same class is called?", options: ["Method Overriding", "Method Overloading", "Encapsulation", "Abstraction"], correctAnswer: "Method Overloading", explanation: "This is Compile-time polymorphism." },
      { id: "oops18", questionText: "A child class providing a specific implementation of a method already provided by its parent is called?", options: ["Method Overriding", "Method Overloading", "Type Casting", "Abstracting"], correctAnswer: "Method Overriding", explanation: "This is Runtime polymorphism." },
      { id: "oops19", questionText: "Which keyword is often used in C++/C# to indicate a method can be overridden?", options: ["static", "final", "virtual", "const"], correctAnswer: "virtual", explanation: "Virtual methods tell the compiler to look for an overridden implementation in child classes." },
      { id: "oops20", questionText: "Which of these is considered Run-time Polymorphism?", options: ["Method Overloading", "Method Overriding", "Function Templates", "Operator Overloading"], correctAnswer: "Method Overriding", explanation: "Overriding is resolved dynamically at runtime based on the object type." }
    ]
  },
  {
    topicId: "abstraction",
    title: "The Control Panel",
    conceptTitle: "Abstraction",
    realWorldScenario: "When you drive a car, you push the accelerator to go faster. You don't know (or need to know) how the fuel injector works, how the spark plugs fire, or how the pistons move. You are provided a simple interface (the pedal) while the complex details are abstracted away.",
    technicalDeepDive: "Abstraction hides complex implementation details and shows only the essential features of an object. This is typically achieved using abstract classes or interfaces.",
    questions: [
      { id: "oops21", questionText: "What is the primary goal of Abstraction?", options: ["Hide implementation details", "Make variables private", "Allow multiple inheritance", "Increase memory space"], correctAnswer: "Hide implementation details", explanation: "It reduces complexity by providing a simplified interface." },
      { id: "oops22", questionText: "Which of the following cannot be instantiated?", options: ["String class", "Public class", "Abstract class", "A subclass"], correctAnswer: "Abstract class", explanation: "Abstract classes contain incomplete methods and rely on child classes to implement them, so they cannot be created directly." },
      { id: "oops23", questionText: "An entirely abstract 'class' containing only method signatures with no implementations (in Java) is called a(n)?", options: ["Abstract property", "Interface", "Virtual struct", "Package"], correctAnswer: "Interface", explanation: "Interfaces act as a pure contract of what a class must do, not how it does it." },
      { id: "oops24", questionText: "While Encapsulation hides data, Abstraction hides...?", options: ["Variables", "Implementation complexity", "Methods", "Objects"], correctAnswer: "Implementation complexity", explanation: "Abstraction is about hiding the 'how', while encapsulation is about hiding the 'what' (state)." },
      { id: "oops25", questionText: "If a class has at least one purely abstract method, the class itself must be?", options: ["Public", "Final", "Abstract", "Static"], correctAnswer: "Abstract", explanation: "Because the blueprint is incomplete, the class must be declared abstract." }
    ]
  },
  {
    topicId: "interfaces-abstract",
    title: "The Contract Chamber",
    conceptTitle: "Interfaces & Abstract Classes",
    realWorldScenario: "An Interface is like a job description: it just says 'this person must be able to drive and speak English.' It doesn't care HOW they learned. An Abstract Class is like a partial training manual — it gives some finished pages and some blank ones you must complete yourself.",
    technicalDeepDive: "An Interface defines a contract with only method signatures. An Abstract Class can have both implemented and unimplemented methods, giving partial behaviour to derived classes.",
    questions: [
      { id: "oops26", questionText: "Can an interface have instance variables?", options: ["Yes, always", "No, only constants", "Yes, private ones", "Only if abstract"], correctAnswer: "No, only constants", explanation: "Interfaces only hold static final (constant) fields, not instance variables." },
      { id: "oops27", questionText: "A class can implement how many interfaces?", options: ["Only 1", "Only 2", "Unlimited", "Only if they share a base"], correctAnswer: "Unlimited", explanation: "Unlike class inheritance, a class can implement multiple interfaces, solving the multiple inheritance problem." },
      { id: "oops28", questionText: "What keyword is used to implement an interface in Java?", options: ["extends", "inherits", "implements", "uses"], correctAnswer: "implements", explanation: "'implements' signals that the class must fulfil the interface contract." },
      { id: "oops29", questionText: "Which of these allows constructors?", options: ["Interface", "Abstract Class", "Both", "Neither"], correctAnswer: "Abstract Class", explanation: "Abstract classes can have constructors (called by subclasses), but interfaces cannot." },
      { id: "oops30", questionText: "What happens if a class does not implement all interface methods?", options: ["It runs with defaults", "It becomes abstract", "Compile-time error", "Runtime error"], correctAnswer: "It becomes abstract", explanation: "If any interface method is left unimplemented, the class itself must be declared abstract." }
    ]
  },
  {
    topicId: "constructors-destructors",
    title: "The Forge & Furnace",
    conceptTitle: "Constructors & Destructors",
    realWorldScenario: "A Constructor is like the birth certificate of an object — it fills in all the initial details the moment an object is created. A Destructor is like the cleanup crew that comes in when the object's life is over, releasing any resources it was holding on to.",
    technicalDeepDive: "A Constructor is a special method called at object creation to initialize state. A Destructor (or Finalizer) is called when an object is garbage collected to free resources.",
    questions: [
      { id: "oops31", questionText: "What is the return type of a constructor?", options: ["void", "int", "The class type", "No return type"], correctAnswer: "No return type", explanation: "Constructors have no return type, not even void — they implicitly return the new object." },
      { id: "oops32", questionText: "What is it called when multiple constructors exist in the same class?", options: ["Overriding", "Overloading", "Abstraction", "Chaining"], correctAnswer: "Overloading", explanation: "Constructor overloading allows different ways to initialize an object." },
      { id: "oops33", questionText: "If no constructor is defined, the compiler provides a...?", options: ["Static block", "Copy constructor", "Default constructor", "Destructor"], correctAnswer: "Default constructor", explanation: "The compiler auto-generates a no-arg constructor if none is defined." },
      { id: "oops34", questionText: "Which keyword calls one constructor from another constructor in the same class (Java)?", options: ["super()", "this()", "base()", "self()"], correctAnswer: "this()", explanation: "'this()' is used for constructor chaining within the same class." },
      { id: "oops35", questionText: "In C++, what is the special method called that runs when an object is destroyed?", options: ["Finalizer", "Destructor", "Terminator", "Cleaner"], correctAnswer: "Destructor", explanation: "Destructors in C++ are prefixed with '~' (e.g., ~MyClass()) and called automatically." }
    ]
  },
  {
    topicId: "solid-principles",
    title: "The Sacred Scrolls",
    conceptTitle: "SOLID Principles",
    realWorldScenario: "SOLID is the professional code of conduct for software engineers. Just like a doctor follows medical ethics ('First, do no harm'), a software engineer follows SOLID to make sure their code is clean, maintainable, and doesn't create a mess for the next developer who reads it.",
    technicalDeepDive: "SOLID is an acronym for 5 design principles: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion.",
    questions: [
      { id: "oops36", questionText: "What does the 'S' in SOLID stand for?", options: ["Static Consistency", "Single Responsibility Principle", "Structured Separation", "Strong Ownership"], correctAnswer: "Single Responsibility Principle", explanation: "A class should have only one reason to change — it should do only one thing." },
      { id: "oops37", questionText: "The Open/Closed Principle states that classes should be...?", options: ["Open to modification, Closed to extension", "Open to extension, Closed to modification", "Open for testing only", "Closed to all changes"], correctAnswer: "Open to extension, Closed to modification", explanation: "You should be able to add features by extending, not by changing existing code." },
      { id: "oops38", questionText: "The 'L' in SOLID (Liskov Substitution) means...?", options: ["Objects of a subclass must be usable in place of their parent", "Objects should be lightweight", "Logic should be linear", "Large classes should be split"], correctAnswer: "Objects of a subclass must be usable in place of their parent", explanation: "A derived class must be substitutable for its base class without breaking the application." },
      { id: "oops39", questionText: "What does the Interface Segregation Principle say?", options: ["Classes should not use interfaces", "Clients should not be forced to implement methods they don't use", "Interfaces should be large", "Always use abstract classes over interfaces"], correctAnswer: "Clients should not be forced to implement methods they don't use", explanation: "Keep interfaces small and specific rather than large and bloated." },
      { id: "oops40", questionText: "The Dependency Inversion Principle says high-level modules should depend on...?", options: ["Low-level modules", "Abstractions (interfaces)", "Other high-level modules", "Database calls"], correctAnswer: "Abstractions (interfaces)", explanation: "Both high-level and low-level modules should depend on abstractions, not concrete implementations." }
    ]
  },
  {
    topicId: "exception-handling",
    title: "The Error Dungeon",
    conceptTitle: "Exception Handling in OOP",
    realWorldScenario: "Imagine you are a bank teller. A customer presents a cheque (method call). If the account has insufficient funds, you don't crash the whole bank — you politely hand back the cheque and say 'Sorry, insufficient funds.' That's exception handling: graceful failure without collapsing the entire system.",
    technicalDeepDive: "Exception handling allows an OOP program to detect and manage runtime errors gracefully using try, catch, finally, and throw blocks, preserving program stability.",
    questions: [
      { id: "oops41", questionText: "Which block is used to detect an exception in OOP languages like Java?", options: ["catch", "error", "try", "handle"], correctAnswer: "try", explanation: "Code that might throw an error is wrapped inside a 'try' block." },
      { id: "oops42", questionText: "Which block always executes whether or not an exception occurs?", options: ["try", "catch", "throw", "finally"], correctAnswer: "finally", explanation: "The 'finally' block runs regardless, typically used for cleanup like closing files." },
      { id: "oops43", questionText: "What keyword is used by a method to signal it can throw an exception (Java)?", options: ["raise", "throws", "error", "emit"], correctAnswer: "throws", explanation: "'throws' in the method signature warns the caller about potential exceptions." },
      { id: "oops44", questionText: "Which is the parent class of all exceptions in Java?", options: ["RuntimeException", "Error", "Exception", "Throwable"], correctAnswer: "Throwable", explanation: "Throwable is the root class from which both Exception and Error derive." },
      { id: "oops45", questionText: "A 'NullPointerException' is an example of which type of exception?", options: ["Checked Exception", "Unchecked / Runtime Exception", "Error", "Custom Exception"], correctAnswer: "Unchecked / Runtime Exception", explanation: "Runtime exceptions are not checked at compile time; they happen during execution." }
    ]
  },
  {
    topicId: "design-patterns",
    title: "The Pattern Library",
    conceptTitle: "OOP Design Patterns",
    realWorldScenario: "Design Patterns are like recipes in a cookbook. If you want to bake a chocolate cake, you don't have to figure it out from scratch — you follow a tried-and-tested recipe. Similarly, design patterns are proven solutions to recurring software design problems.",
    technicalDeepDive: "Design Patterns are reusable solutions to common OOP design problems, categorised into Creational, Structural, and Behavioral patterns (by the 'Gang of Four').",
    questions: [
      { id: "oops46", questionText: "Which design pattern ensures only ONE instance of a class is ever created?", options: ["Factory", "Observer", "Singleton", "Decorator"], correctAnswer: "Singleton", explanation: "The Singleton pattern restricts instantiation of a class to a single object." },
      { id: "oops47", questionText: "The Factory Pattern is a _____ type of design pattern.", options: ["Structural", "Behavioral", "Creational", "Functional"], correctAnswer: "Creational", explanation: "Creational patterns deal with object creation mechanisms." },
      { id: "oops48", questionText: "Which pattern defines a one-to-many dependency so that when one object changes state, all dependents are notified?", options: ["Observer", "Strategy", "Singleton", "Adapter"], correctAnswer: "Observer", explanation: "The Observer pattern is the basis for event-driven programming and pub/sub systems." },
      { id: "oops49", questionText: "The pattern that allows incompatible interfaces to work together is called?", options: ["Decorator", "Proxy", "Adapter", "Bridge"], correctAnswer: "Adapter", explanation: "The Adapter pattern acts as a converter between two incompatible interfaces." },
      { id: "oops50", questionText: "Which pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable?", options: ["Observer", "Strategy", "Template Method", "Command"], correctAnswer: "Strategy", explanation: "Strategy allows the algorithm to vary independently from the clients that use it." }
    ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await OOPSArena.deleteMany({});
    await OOPSArena.insertMany(oopsData);
    console.log("The OOPs Arena has been initialized with 10 Concepts & 50 Questions!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
