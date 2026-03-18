const mongoose = require('mongoose');
require('dotenv').config();

const cnSchema = new mongoose.Schema({
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

const CNArena = mongoose.model('CNArena', cnSchema, 'cn_quests');

const cnData = [
  {
    topicId: "osi-model",
    title: "The Seven Heavens",
    conceptTitle: "The OSI Model Layers",
    realWorldScenario: "Think of sending a physical letter. You write it (Application), put it in an envelope (Presentation), address it (Session), decide on Express or Ground shipping (Transport), the post office routes it (Network), it travels on a truck (Data Link), and finally, it's just ink on paper (Physical).",
    technicalDeepDive: "The OSI model is a conceptual framework used to understand network interactions in seven distinct layers. Each layer serves the layer above it and is served by the layer below it.",
    questions: [
      { id: "cn1", questionText: "Which layer is responsible for routing packets across different networks?", options: ["Data Link", "Network", "Transport", "Physical"], correctAnswer: "Network", explanation: "The Network Layer (Layer 3) handles IP addressing and routing." },
      { id: "cn2", questionText: "Which layer ensures error-free delivery of data segments?", options: ["Session", "Transport", "Network", "Application"], correctAnswer: "Transport", explanation: "Transport Layer (TCP) handles flow control and error recovery." },
      { id: "cn3", questionText: "Encryption and Compression happen at which layer?", options: ["Presentation", "Application", "Session", "Transport"], correctAnswer: "Presentation", explanation: "Layer 6 (Presentation) formats data for the application." },
      { id: "cn4", questionText: "HTTP and FTP protocols belong to which layer?", options: ["Network", "Presentation", "Application", "Session"], correctAnswer: "Application", explanation: "The Application layer is where user-facing software lives." },
      { id: "cn5", questionText: "MAC addresses operate at which layer?", options: ["Physical", "Network", "Data Link", "Transport"], correctAnswer: "Data Link", explanation: "Layer 2 (Data Link) uses MAC addresses to move data between local devices." }
    ]
  },
  {
    topicId: "tcp-udp",
    title: "The Handshake vs The Shout",
    conceptTitle: "TCP vs UDP Protocols",
    realWorldScenario: "TCP is like a Phone Call: You say 'Hello', they say 'Hello', you talk, and if they miss a word, they ask you to repeat it. UDP is like a Megaphone: You shout the information out; if someone hears it, great. If not, you don't care (used for Video Streaming/Gaming).",
    technicalDeepDive: "TCP (Transmission Control Protocol) is connection-oriented and reliable. UDP (User Datagram Protocol) is connectionless and prioritized for speed.",
    questions: [
      { id: "cn6", questionText: "Which protocol uses a 'Three-Way Handshake'?", options: ["UDP", "IP", "TCP", "ICMP"], correctAnswer: "TCP", explanation: "TCP establishes a connection using SYN, SYN-ACK, and ACK." },
      { id: "cn7", questionText: "For Online Gaming and Live Streaming, which protocol is preferred?", options: ["TCP", "UDP", "HTTP", "SMTP"], correctAnswer: "UDP", explanation: "UDP is faster because it doesn't wait for acknowledgments." },
      { id: "cn8", questionText: "What is the primary disadvantage of UDP?", options: ["Slow speed", "Heavy header", "Unreliable delivery", "High latency"], correctAnswer: "Unreliable delivery", explanation: "UDP does not guarantee that packets will reach the destination." },
      { id: "cn9", questionText: "TCP belongs to which layer of the OSI model?", options: ["Network", "Transport", "Data Link", "Session"], correctAnswer: "Transport", explanation: "Both TCP and UDP are Transport Layer protocols." },
      { id: "cn10", questionText: "Which one provides flow control?", options: ["UDP", "IP", "TCP", "DNS"], correctAnswer: "TCP", explanation: "TCP manages the rate of data transmission to prevent congestion." }
    ]
  },
  {
    topicId: "ip-addressing",
    title: "The Digital Address",
    conceptTitle: "IPv4 & Subnetting",
    realWorldScenario: "Imagine a massive apartment building. The street address is the Network ID. Your specific apartment number is the Host ID. Subnetting is like dividing one big floor into smaller private offices so mail can be sorted faster.",
    technicalDeepDive: "IPv4 uses 32-bit addresses. Subnet masks (like 255.255.255.0) are used to distinguish between the network portion and the host portion of an IP address.",
    questions: [
      { id: "cn11", questionText: "How many bits are in an IPv4 address?", options: ["32", "64", "128", "16"], correctAnswer: "32", explanation: "IPv4 is a 32-bit address, usually written in 4 octets." },
      { id: "cn12", questionText: "Which IP class is used for large networks?", options: ["Class A", "Class B", "Class C", "Class D"], correctAnswer: "Class A", explanation: "Class A allows for over 16 million hosts per network." },
      { id: "cn13", questionText: "What is the purpose of a Subnet Mask?", options: ["Identify MAC", "Hide IP", "Separate Network and Host IDs", "Encrypt data"], correctAnswer: "Separate Network and Host IDs", explanation: "The mask tells the router which part of the IP is the 'street' and which is the 'house'." },
      { id: "cn14", questionText: "Which IP is reserved for loopback (localhost)?", options: ["192.168.1.1", "127.0.0.1", "10.0.0.1", "255.255.255.255"], correctAnswer: "127.0.0.1", explanation: "127.0.0.1 is used to test the network software on your own machine." },
      { id: "cn15", questionText: "How many bits are in an IPv6 address?", options: ["32", "64", "128", "256"], correctAnswer: "128", explanation: "IPv6 was created to provide a much larger address space (128-bit)." }
    ]
  },
  {
    topicId: "dns-resolver",
    title: "The Phonebook of the Web",
    conceptTitle: "DNS (Domain Name System)",
    realWorldScenario: "You don't remember your friends' phone numbers; you just remember their names. When you click 'Call Alice', your phone looks up her number. DNS does the same: you type 'google.com' and DNS finds the IP address '142.250.190.46'.",
    technicalDeepDive: "DNS translates human-readable domain names into machine-readable IP addresses. It uses a hierarchical distributed database system.",
    questions: [
      { id: "cn16", questionText: "DNS primarily uses which port?", options: ["80", "443", "53", "25"], correctAnswer: "53", explanation: "Port 53 is dedicated to DNS queries." },
      { id: "cn17", questionText: "Which DNS record maps a domain to an IPv4 address?", options: ["CNAME", "MX", "A Record", "AAAA Record"], correctAnswer: "A Record", explanation: "'A' stands for Address; it maps names to IPv4." },
      { id: "cn18", questionText: "What does TLD stand for in DNS?", options: ["Total Link Data", "Top-Level Domain", "Transport Layer DNS", "Time-Limit Delivery"], correctAnswer: "Top-Level Domain", explanation: "TLDs are the endings like .com, .org, or .in." },
      { id: "cn19", questionText: "DNS usually runs over which transport protocol?", options: ["TCP", "UDP", "ICMP", "IGMP"], correctAnswer: "UDP", explanation: "DNS uses UDP for speed, though it can use TCP for large transfers." },
      { id: "cn20", questionText: "Mapping an IP back to a domain name is called?", options: ["Forward Lookup", "Reverse Lookup", "Recursive Query", "Caching"], correctAnswer: "Reverse Lookup", explanation: "Reverse DNS lookups find the name associated with an IP." }
    ]
  },
  {
    topicId: "http-https",
    title: "The Web's Language",
    conceptTitle: "HTTP vs HTTPS",
    realWorldScenario: "HTTP is like sending a postcard; anyone at the post office can read your message. HTTPS is like sending that postcard inside a locked, steel box (SSL/TLS). Only the receiver has the key to open it.",
    technicalDeepDive: "HTTP (Hypertext Transfer Protocol) is the foundation of data exchange on the web. HTTPS adds a layer of security using SSL/TLS certificates for encryption.",
    questions: [
      { id: "cn21", questionText: "Which port does HTTPS typically use?", options: ["80", "21", "443", "8080"], correctAnswer: "443", explanation: "Standard HTTP uses 80, while secure HTTPS uses 443." },
      { id: "cn22", questionText: "What does the 'S' in HTTPS stand for?", options: ["Socket", "Secure", "Simple", "Standard"], correctAnswer: "Secure", explanation: "It indicates that the connection is encrypted." },
      { id: "cn23", questionText: "Which HTTP status code means 'Not Found'?", options: ["200", "404", "500", "301"], correctAnswer: "404", explanation: "404 is the client-side error for a missing resource." },
      { id: "cn24", questionText: "Which HTTP method is used to submit data to a server?", options: ["GET", "POST", "HEAD", "OPTIONS"], correctAnswer: "POST", explanation: "POST is used to send data, like form entries, to the server." },
      { id: "cn25", questionText: "What provides the security in HTTPS?", options: ["TCP", "Firewalls", "SSL/TLS", "IPv6"], correctAnswer: "SSL/TLS", explanation: "SSL/TLS certificates provide encryption and authentication." }
    ]
  },
  {
    topicId: "dhcp-auto",
    title: "The Concierge",
    conceptTitle: "DHCP (Dynamic Host Configuration Protocol)",
    realWorldScenario: "When you check into a hotel, the concierge gives you a room key. You don't pick your own room number; they assign one that is available. DHCP is the network concierge that automatically gives your phone or laptop an IP address when you join a Wi-Fi network.",
    technicalDeepDive: "DHCP works on the DORA process: Discover (Client), Offer (Server), Request (Client), Acknowledgment (Server). It operates on UDP ports 67 and 68.",
    questions: [
      { id: "cn26", questionText: "What does the 'D' in the DHCP DORA process stand for?", options: ["Data", "Deliver", "Discover", "Disconnect"], correctAnswer: "Discover", explanation: "The client first sends a 'DHCP Discover' broadcast to find a server." },
      { id: "cn27", questionText: "DHCP uses which transport protocol?", options: ["TCP", "UDP", "ICMP", "HTTP"], correctAnswer: "UDP", explanation: "DHCP uses UDP because it's fast and connectionless." },
      { id: "cn28", questionText: "A temporary IP address assigned by DHCP is called a?", options: ["Rent", "Lease", "Loan", "Permission"], correctAnswer: "Lease", explanation: "IPs are assigned for a specific duration called a lease time." },
      { id: "cn29", questionText: "Which port does the DHCP Server listen on?", options: ["67", "68", "80", "443"], correctAnswer: "67", explanation: "Server listens on 67, Client listens on 68." },
      { id: "cn30", questionText: "If DHCP fails, Windows often assigns an address starting with 169.254. This is called?", options: ["Static IP", "APIPA", "DNS", "Subnetting"], correctAnswer: "APIPA", explanation: "Automatic Private IP Addressing (APIPA) is a fallback when no DHCP is found." }
    ]
  },
  {
    topicId: "firewalls-proxies",
    title: "The Bouncer",
    conceptTitle: "Firewalls & Proxies",
    realWorldScenario: "A Firewall is like a security guard at a club checking IDs against a 'banned' list. A Proxy is like a personal assistant: instead of you going to the store, the assistant goes for you, keeping your identity hidden from the shopkeeper.",
    technicalDeepDive: "Firewalls filter traffic based on rules (IP, Port, Protocol). Proxies act as intermediaries for requests, often used for caching and anonymity.",
    questions: [
      { id: "cn31", questionText: "A firewall that tracks the state of active connections is called?", options: ["Packet Filter", "Stateless", "Stateful Inspection", "Proxy"], correctAnswer: "Stateful Inspection", explanation: "Stateful firewalls remember previous packets to make smarter decisions." },
      { id: "cn32", questionText: "Which device hides the internal IP addresses of a network from the internet?", options: ["Switch", "Hub", "Proxy Server", "Repeater"], correctAnswer: "Proxy Server", explanation: "A proxy sends requests on behalf of the user, masking their IP." },
      { id: "cn33", questionText: "What is the primary goal of a firewall?", options: ["Speed up internet", "Block unauthorized access", "Assign IP addresses", "Connect cables"], correctAnswer: "Block unauthorized access", explanation: "Firewalls create a barrier between trusted and untrusted networks." },
      { id: "cn34", questionText: "Which type of proxy is used to bypass geo-restrictions?", options: ["Forward Proxy", "Reverse Proxy", "Transparent Proxy", "Stateful Proxy"], correctAnswer: "Forward Proxy", explanation: "Forward proxies sit in front of the client to reach external servers." },
      { id: "cn35", questionText: "A 'Reverse Proxy' is typically used to?", options: ["Hide client IP", "Balance load on servers", "Assign DHCP", "Filter outgoing mail"], correctAnswer: "Balance load on servers", explanation: "Reverse proxies sit in front of web servers to distribute traffic." }
    ]
  },
  {
    topicId: "topologies",
    title: "The City Map",
    conceptTitle: "Network Topologies",
    realWorldScenario: "Star Topology is like a wheel where every spoke connects to a central hub. Mesh Topology is like a spiderweb where every point connects to every other point—it's expensive but nearly impossible to destroy.",
    technicalDeepDive: "Topologies define the physical or logical layout of a network. Common types include Bus, Star, Ring, Mesh, and Hybrid.",
    questions: [
      { id: "cn36", questionText: "In which topology does a single cable failure bring down the whole network?", options: ["Star", "Mesh", "Bus", "Tree"], correctAnswer: "Bus", explanation: "In a Bus topology, all devices share a single backbone cable." },
      { id: "cn37", questionText: "Which topology is the most reliable (fault-tolerant)?", options: ["Star", "Mesh", "Ring", "Bus"], correctAnswer: "Mesh", explanation: "Mesh has multiple paths for data to travel." },
      { id: "cn38", questionText: "Modern Wi-Fi routers and Ethernet switches usually form which topology?", options: ["Bus", "Star", "Ring", "Mesh"], correctAnswer: "Star", explanation: "The router/switch acts as the central hub." },
      { id: "cn39", questionText: "In a Ring topology, what is passed around to give a station permission to transmit?", options: ["Packet", "Bit", "Token", "Address"], correctAnswer: "Token", explanation: "Token Ring networks use a special frame called a token." },
      { id: "cn40", questionText: "A combination of two or more topologies is called?", options: ["Mesh", "Compound", "Hybrid", "Mixed"], correctAnswer: "Hybrid", explanation: "Hybrid networks combine features of different layouts." }
    ]
  },
  {
    topicId: "mac-vs-ip",
    title: "Name vs Location",
    conceptTitle: "MAC vs IP Addressing",
    realWorldScenario: "Your MAC address is like your SSN or Aadhaar Number—it's tied to you (the hardware) forever. Your IP address is like your current mailing address—it changes depending on where you are currently 'sitting' in the world.",
    technicalDeepDive: "MAC addresses are 48-bit burned-in addresses (Layer 2). IP addresses are 32 or 128-bit logical addresses (Layer 3).",
    questions: [
      { id: "cn41", questionText: "Which address is permanent and assigned by the manufacturer?", options: ["IP Address", "MAC Address", "Port Number", "Subnet Mask"], correctAnswer: "MAC Address", explanation: "MAC is a hardware address unique to the Network Interface Card." },
      { id: "cn42", questionText: "How many bits are in a MAC address?", options: ["32", "48", "64", "128"], correctAnswer: "48", explanation: "MAC addresses are 48 bits long, usually written in hexadecimal." },
      { id: "cn43", questionText: "Which layer handles MAC addresses?", options: ["Network", "Data Link", "Physical", "Transport"], correctAnswer: "Data Link", explanation: "Layer 2 (Data Link) uses MAC addresses for local delivery." },
      { id: "cn44", questionText: "An IP address is considered a _____ address.", options: ["Physical", "Logical", "Hardware", "Permanent"], correctAnswer: "Logical", explanation: "IPs are logical because they are assigned via software/network configuration." },
      { id: "cn45", questionText: "What is the first half of a MAC address (first 24 bits) called?", options: ["NIC ID", "OUI (Organizationally Unique Identifier)", "Checksum", "IP Prefix"], correctAnswer: "OUI (Organizationally Unique Identifier)", explanation: "The OUI identifies the manufacturer of the device." }
    ]
  },
  {
    topicId: "arp-bridge",
    title: "The Bridge",
    conceptTitle: "ARP (Address Resolution Protocol)",
    realWorldScenario: "You are in a classroom. You know the student named 'Alice' (IP), but you don't know which seat she is in (MAC). You shout out, 'Who is Alice? Tell me your seat number!' Alice responds, 'I am in Seat 5!' Now you can send her a note.",
    technicalDeepDive: "ARP resolves Layer 3 (IP) addresses to Layer 2 (MAC) addresses. It sends a broadcast request and receives a unicast reply.",
    questions: [
      { id: "cn46", questionText: "What does ARP find?", options: ["IP from MAC", "MAC from IP", "Port from IP", "Domain from IP"], correctAnswer: "MAC from IP", explanation: "ARP maps a known IP to a physical MAC address." },
      { id: "cn47", questionText: "ARP requests are sent as a _____.", options: ["Unicast", "Multicast", "Broadcast", "Anycast"], correctAnswer: "Broadcast", explanation: "Requests are sent to everyone to find the specific owner of the IP." },
      { id: "cn48", questionText: "Where does a computer store recently learned MAC addresses?", options: ["DNS Cache", "ARP Table/Cache", "ROM", "Hard Drive"], correctAnswer: "ARP Table/Cache", explanation: "The ARP table saves mappings to avoid constant broadcasting." },
      { id: "cn49", questionText: "A security attack where a fake MAC is linked to a legitimate IP is called?", options: ["ARP Poisoning", "DNS Spoofing", "DDoS", "Phishing"], correctAnswer: "ARP Poisoning", explanation: "Poisoning tricks a device into sending data to the attacker." },
      { id: "cn50", questionText: "ARP operates between which two layers?", options: ["1 and 2", "2 and 3", "3 and 4", "4 and 5"], correctAnswer: "2 and 3", explanation: "It bridges the Data Link (2) and Network (3) layers." }
    ]
  },
  {
    topicId: "icmp-ping",
    title: "The Echo",
    conceptTitle: "ICMP & Pinging",
    realWorldScenario: "Shouting into a cave. You yell 'Hello!' and wait for the echo. The time it takes for the echo to return tells you how deep the cave is. If there is no echo, the cave might be blocked. Ping works exactly this way to check if a server is 'alive.'",
    technicalDeepDive: "ICMP (Internet Control Message Protocol) is used by network devices to send error messages and operational information. 'Ping' uses ICMP Echo Request and Reply.",
    questions: [
      { id: "cn51", questionText: "Which command uses ICMP to check connectivity?", options: ["ipconfig", "ping", "get", "cd"], correctAnswer: "ping", explanation: "Ping is the primary tool for testing reachability." },
      { id: "cn52", questionText: "What does ICMP stand for?", options: ["Internal Communication Message Protocol", "Internet Control Message Protocol", "Inter-Core Management Protocol", "Internet Connection Mode Protocol"], correctAnswer: "Internet Control Message Protocol", explanation: "ICMP handles error and control messages for IP." },
      { id: "cn53", questionText: "Which tool uses ICMP to show the path a packet takes to a destination?", options: ["Ping", "Nslookup", "Traceroute", "Netstat"], correctAnswer: "Traceroute", explanation: "Traceroute uses TTL and ICMP to map every 'hop' (router) along the way." },
      { id: "cn54", questionText: "If a router cannot find a route to a destination, it sends an ICMP _____ message.", options: ["Echo Reply", "Time Exceeded", "Destination Unreachable", "Source Quench"], correctAnswer: "Destination Unreachable", explanation: "This tells the sender that the packet could not be delivered." },
      { id: "cn55", questionText: "ICMP operates at which layer?", options: ["Data Link", "Network", "Transport", "Session"], correctAnswer: "Network", explanation: "ICMP is a Layer 3 protocol." }
    ]
  },
  {
    topicId: "routers-switches",
    title: "Sorters & Hubs",
    conceptTitle: "Routers vs Switches",
    realWorldScenario: "A Switch is like a walkie-talkie channel for people inside the same building. A Router is like the Postal Service that moves packages between different cities. The switch connects devices; the router connects networks.",
    technicalDeepDive: "Switches use MAC addresses (Layer 2) to connect devices in a LAN. Routers use IP addresses (Layer 3) to route traffic between different networks (WAN).",
    questions: [
      { id: "cn56", questionText: "Which device is used to connect different networks?", options: ["Switch", "Hub", "Router", "Bridge"], correctAnswer: "Router", explanation: "Routers are the gateways between separate networks." },
      { id: "cn57", questionText: "A Layer 2 switch makes forwarding decisions based on?", options: ["IP Address", "Port Number", "MAC Address", "URL"], correctAnswer: "MAC Address", explanation: "Switches look at the destination MAC in the frame header." },
      { id: "cn58", questionText: "Which device creates a single broadcast domain but multiple collision domains?", options: ["Hub", "Switch", "Repeater", "Modem"], correctAnswer: "Switch", explanation: "Switches prevent collisions but still allow broadcasts to pass." },
      { id: "cn59", questionText: "What is a 'Default Gateway'?", options: ["A switch port", "The router's IP address", "The DNS server", "A firewall rule"], correctAnswer: "The router's IP address", explanation: "It is the path out of your local network." },
      { id: "cn60", questionText: "Which device simply repeats a signal to all ports (Layer 1)?", options: ["Switch", "Router", "Hub", "Gateway"], correctAnswer: "Hub", explanation: "Hubs are 'dumb' devices that broadcast everything to everyone." }
    ]
  },
  {
    topicId: "vlans",
    title: "The Virtual Room",
    conceptTitle: "VLANs (Virtual LANs)",
    realWorldScenario: "You have one big office (Switch), but you don't want the Sales team to hear what the HR team is talking about. Instead of building new walls, you give everyone 'magic headphones.' Even though they are in the same room, they can only hear their own team. That's a VLAN.",
    technicalDeepDive: "VLANs allow a physical switch to be partitioned into multiple logical networks, improving security and reducing broadcast traffic.",
    questions: [
      { id: "cn61", questionText: "What is the primary benefit of a VLAN?", options: ["Increase internet speed", "Logical segmentation of a network", "Hardware cooling", "Replacing routers"], correctAnswer: "Logical segmentation of a network", explanation: "VLANs group users regardless of physical location." },
      { id: "cn62", questionText: "Which protocol is used for VLAN tagging?", options: ["802.11", "802.3", "802.1Q", "HTTP"], correctAnswer: "802.1Q", explanation: "802.1Q adds a tag to the Ethernet frame to identify the VLAN." },
      { id: "cn63", questionText: "A port that carries traffic for multiple VLANs is called a?", options: ["Access Port", "Trunk Port", "Router Port", "Static Port"], correctAnswer: "Trunk Port", explanation: "Trunk ports connect switches and carry all VLAN traffic." },
      { id: "cn64", questionText: "VLANs help reduce _____ traffic.", options: ["Unicast", "Encryption", "Broadcast", "TCP"], correctAnswer: "Broadcast", explanation: "Broadcasts are limited to the specific VLAN they originated in." },
      { id: "cn65", questionText: "To communicate between two different VLANs, you need a?", options: ["Repeater", "Layer 2 Switch", "Router (Layer 3 device)", "Hub"], correctAnswer: "Router (Layer 3 device)", explanation: "Inter-VLAN routing requires a router or a Layer 3 switch." }
    ]
  },
  {
    topicId: "wireless-80211",
    title: "Air Waves",
    conceptTitle: "Wireless Standards (Wi-Fi)",
    realWorldScenario: "Think of radio stations. To hear the music, you must tune into the right frequency (2.4GHz or 5GHz). Older radios are slow (802.11b), while modern ones (Wi-Fi 6) can handle 4K movies and games without lagging.",
    technicalDeepDive: "802.11 is the set of standards for WLANs. Wi-Fi 6 (802.11ax) is the latest, offering better efficiency in crowded areas.",
    questions: [
      { id: "cn66", questionText: "What is the standard number for Wi-Fi?", options: ["802.3", "802.11", "802.15", "802.1Q"], correctAnswer: "802.11", explanation: "IEEE 802.11 defines wireless networking." },
      { id: "cn67", questionText: "Which frequency band has a longer range but slower speed?", options: ["2.4 GHz", "5 GHz", "60 GHz", "100 GHz"], correctAnswer: "2.4 GHz", explanation: "2.4 GHz penetrates walls better but is slower and more crowded." },
      { id: "cn68", questionText: "Wi-Fi 6 is the marketing name for which standard?", options: ["802.11ac", "802.11n", "802.11ax", "802.11g"], correctAnswer: "802.11ax", explanation: "802.11ax is the high-efficiency Wi-Fi 6 standard." },
      { id: "cn69", questionText: "What is an SSID?", options: ["A secure password", "The name of the Wi-Fi network", "The router's MAC", "A type of antenna"], correctAnswer: "The name of the Wi-Fi network", explanation: "Service Set Identifier (SSID) is the name you see when connecting." },
      { id: "cn70", questionText: "Which encryption is the most secure for home Wi-Fi today?", options: ["WEP", "WPA", "WPA2", "WPA3"], correctAnswer: "WPA3", explanation: "WPA3 is the latest and most secure wireless encryption protocol." }
    ]
  },
  {
    topicId: "security-basics",
    title: "Shadow Battles",
    conceptTitle: "Cyber Security Basics",
    realWorldScenario: "DDoS is like 1,000 people trying to walk through a single door at the same time—the door gets stuck. Man-in-the-Middle is like someone intercepting your mail, reading it, and resealing it before you even notice.",
    technicalDeepDive: "Network security involves protecting data integrity and availability. Common threats include DDoS, Spoofing, and Sniffing.",
    questions: [
      { id: "cn71", questionText: "What does 'DDoS' stand for?", options: ["Data Delivery on System", "Distributed Denial of Service", "Direct Domain Operating System", "Digital Data over Server"], correctAnswer: "Distributed Denial of Service", explanation: "DDoS uses many computers to overwhelm a target server." },
      { id: "cn72", questionText: "In a 'Man-in-the-Middle' attack, the attacker intercepts _____.", options: ["The server only", "The client only", "Communication between two parties", "The router's power"], correctAnswer: "Communication between two parties", explanation: "The attacker secretly relays and alters the communication." },
      { id: "cn73", questionText: "What is 'Phishing'?", options: ["Scanning for open ports", "Sending fake emails to steal data", "Overloading a switch", "Cracking a Wi-Fi password"], correctAnswer: "Sending fake emails to steal data", explanation: "Phishing tricks users into giving up sensitive info." },
      { id: "cn74", questionText: "Which protocol is used to securely log into a remote server?", options: ["Telnet", "FTP", "SSH", "HTTP"], correctAnswer: "SSH", explanation: "Secure Shell (SSH) encrypts the login session, unlike Telnet." },
      { id: "cn75", questionText: "What does a VPN (Virtual Private Network) provide?", options: ["Free internet", "An encrypted tunnel for data", "New hardware", "Higher bandwidth"], correctAnswer: "An encrypted tunnel for data", explanation: "VPNs protect your data by encrypting it as it travels over the internet." }
    ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await CNArena.deleteMany({});
    await CNArena.insertMany(cnData);
    console.log("📡 The CN Arena has been initialized with 5/15 Floors!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();