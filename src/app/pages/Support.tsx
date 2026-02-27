import { useState } from "react";
import { MessageCircle, FileText, MapPin, Clock, CheckCircle, AlertCircle, Send } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";

const tickets = [
  {
    id: "TKT-001234",
    title: "Slow internet speed",
    status: "in-progress",
    created: "Feb 25, 2026",
    lastUpdate: "Feb 26, 2026 10:30",
    category: "Technical",
  },
  {
    id: "TKT-001189",
    title: "Billing inquiry",
    status: "resolved",
    created: "Feb 20, 2026",
    lastUpdate: "Feb 21, 2026 14:20",
    category: "Billing",
  },
];

const outages = [
  {
    area: "Jakarta Selatan",
    status: "ongoing",
    reported: "Feb 26, 2026 08:00",
    eta: "Feb 26, 2026 14:00",
    affected: 150,
  },
];

const faqs = [
  {
    question: "How do I reset my WiFi password?",
    category: "Technical",
  },
  {
    question: "When will my bill be due?",
    category: "Billing",
  },
  {
    question: "How to upgrade my package?",
    category: "Account",
  },
];

export function Support() {
  const [message, setMessage] = useState("");

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Support & Service</h1>
        <p className="text-muted-foreground">We're here to help 24/7</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h3 className="font-medium">Live Chat</h3>
              <p className="text-sm text-muted-foreground">Chat with our team</p>
            </div>
          </div>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-medium">New Ticket</h3>
              <p className="text-sm text-muted-foreground">Submit a request</p>
            </div>
          </div>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-medium">Outage Map</h3>
              <p className="text-sm text-muted-foreground">Check service status</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Active Outages */}
      {outages.length > 0 && (
        <Card className="border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-orange-900 dark:text-orange-100 mb-2">
                Service Outage Alert
              </h3>
              {outages.map((outage, index) => (
                <div key={index} className="text-sm text-orange-800 dark:text-orange-200">
                  <p className="font-medium mb-1">{outage.area}</p>
                  <p>Reported: {outage.reported}</p>
                  <p>Expected Resolution: {outage.eta}</p>
                  <p>{outage.affected} customers affected</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* My Tickets */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">My Support Tickets</h3>
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            New Ticket
          </Button>
        </div>
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{ticket.title}</h4>
                    <Badge
                      variant={
                        ticket.status === "resolved"
                          ? "success"
                          : ticket.status === "in-progress"
                          ? "info"
                          : "warning"
                      }
                    >
                      {ticket.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{ticket.id}</p>
                </div>
                <Badge variant="default">{ticket.category}</Badge>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Created: {ticket.created}</span>
                <span>Last update: {ticket.lastUpdate}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Live Chat */}
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="font-bold">Live Chat</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">Support team is online</span>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 mb-4 h-64 overflow-y-auto">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white text-sm">
                S
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 max-w-[80%]">
                <p className="text-sm">Hello! How can I help you today?</p>
                <p className="text-xs text-muted-foreground mt-1">10:30 AM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-secondary"
          />
          <Button>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* FAQs */}
      <Card>
        <h3 className="text-lg font-bold mb-4">Frequently Asked Questions</h3>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <button
              key={index}
              className="w-full text-left p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm">{faq.question}</span>
                <Badge variant="default">{faq.category}</Badge>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* SLA Tracking */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Average Response Time</p>
          </div>
          <h3 className="text-2xl font-bold">&lt; 5 min</h3>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-sm text-muted-foreground">Resolution Rate</p>
          </div>
          <h3 className="text-2xl font-bold">98.5%</h3>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-2">
            <MessageCircle className="w-5 h-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
          </div>
          <h3 className="text-2xl font-bold">4.8/5</h3>
        </Card>
      </div>
    </div>
  );
}