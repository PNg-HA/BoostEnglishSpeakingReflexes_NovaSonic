class S2sEvent {
    static DEFAULT_INFER_CONFIG = {
      maxTokens: 1024,
      topP: 0.95,
      temperature: 0.7
    };
  
    static DEFAULT_SYSTEM_PROMPT = "You are a friend. The user and you will engage in a spoken dialog exchanging the transcripts of a natural real-time conversation. Keep your responses short, generally two or three sentences for chatty scenarios. You may start each of your sentences with emotions in square brackets such as [amused], [neutral] or any other stage direction such as [joyful]. Only use a single pair of square brackets for indicating a stage command.";
  
    static DEFAULT_AUDIO_INPUT_CONFIG = {
      mediaType: "audio/lpcm",
      sampleRateHertz: 16000,
      sampleSizeBits: 16,
      channelCount: 1,
      audioType: "SPEECH",
      encoding: "base64"
    };
  
    static DEFAULT_AUDIO_OUTPUT_CONFIG = {
      mediaType: "audio/lpcm",
      sampleRateHertz: 24000,
      sampleSizeBits: 16,
      channelCount: 1,
      voiceId: "matthew",
      encoding: "base64",
      audioType: "SPEECH"
    };
  
    static DEFAULT_TOOL_CONFIG = {
      tools: [
        {
        toolSpec: {
          name: "getDateTool",
          description: "get information about the current date and time",
          inputSchema: {
            json: JSON.stringify({
                "type": "object",
                "properties": {},
                "required": []
                }
            )
          }
        }
      },
      {
        toolSpec: {
          name: "getKbTool",
          description: "get information about the Amazon policy",
          inputSchema: {
            json: JSON.stringify({
                "type": "object",
                "properties": {},
                "required": []
              }
            )
          }
        }
      },
      {
        toolSpec: {
          name: "locationMcpTool",
          description: "Access location services to find places, addresses.",
          inputSchema: {
            json: JSON.stringify({
                "type": "object",
                "properties": {
                  "query": {
                    "type": "string",
                    "description": "Query required to find a place or address. For example 'largest zoo in Seattle'}"
                  }
                },
                "required": ["query"]
              }
            )
          }
        }
      },
    
      {
        toolSpec: {
          name: "getBookingDetails",
          description: "Manage bookings: create, get, update, delete, list, or find bookings by customer name. For update_booking, you can update by booking_id or by customer_name. If booking_id is not provided, all bookings for the given customer_name will be updated.",
          inputSchema: {
            json: JSON.stringify({
              type: "object",
              properties: {
                operation: {
                  type: "string",
                  description: "The booking operation to perform. One of: get_booking, create_booking, update_booking, delete_booking, list_bookings, find_bookings_by_customer. For update_booking, you can specify either booking_id or customer_name. If booking_id is not provided, all bookings for the given customer_name will be updated."
                },
                booking_id: { type: "string", description: "Booking ID (for get, update, delete)" },
                customer_name: { type: "string", description: "Customer name (for find_bookings_by_customer, get_booking, update_booking). For update_booking, if booking_id is not provided, all bookings for this customer will be updated." },
                booking_details: { type: "object", description: "Details for creating a booking" },
                update_data: { type: "object", description: "Fields to update in a booking. If using customer_name, all bookings for that customer may be updated." },
                limit: { type: "integer", description: "Limit for list_bookings or find_bookings_by_customer" }
              },
              required: ["operation"]
            })
          }
        }
      }
    ]
    };

    static DEFAULT_CHAT_HISTORY = [
      {
        "content": "hi there i would like to cancel my hotel reservation",
        "role": "USER"
      },
      {
        "content": "Hello! I'd be happy to assist you with cancelling your hotel reservation. To get started, could you please provide me with your full name and the check-in date for your reservation?",
        "role": "ASSISTANT"
      },
      {
        "content": "yeah so my name is don smith",
        "role": "USER"
      },
      {
        "content": "Thank you, Don. Now, could you please provide me with the check-in date for your reservation?",
        "role": "ASSISTANT"
      },
      {
        "content": "yes so um let me check just a second",
        "role": "USER"
      },
      {
        "content": "Take your time, Don. I'll be here when you're ready.",
        "role": "ASSISTANT"
      }
    ];
  
    static sessionStart(inferenceConfig = S2sEvent.DEFAULT_INFER_CONFIG) {
      return { event: { sessionStart: { inferenceConfiguration: inferenceConfig } } };
    }
  
    static promptStart(promptName, audioOutputConfig = S2sEvent.DEFAULT_AUDIO_OUTPUT_CONFIG, toolConfig = S2sEvent.DEFAULT_TOOL_CONFIG) {
      return {
        "event": {
          "promptStart": {
            "promptName": promptName,
            "textOutputConfiguration": {
              "mediaType": "text/plain"
            },
            "audioOutputConfiguration": audioOutputConfig,
          
          "toolUseOutputConfiguration": {
            "mediaType": "application/json"
          },
          "toolConfiguration": toolConfig
        }
        }
      }
    }
  
    static contentStartText(promptName, contentName, role="SYSTEM") {
      return {
        "event": {
          "contentStart": {
            "promptName": promptName,
            "contentName": contentName,
            "type": "TEXT",
            "interactive": true,
            "role": role,
            "textInputConfiguration": {
              "mediaType": "text/plain"
            }
          }
        }
      }
    }
  
    static textInput(promptName, contentName, systemPrompt = S2sEvent.DEFAULT_SYSTEM_PROMPT) {
      var evt = {
        "event": {
          "textInput": {
            "promptName": promptName,
            "contentName": contentName,
            "content": systemPrompt
          }
        }
      }
      return evt;
    }
  
    static contentEnd(promptName, contentName) {
      return {
        "event": {
          "contentEnd": {
            "promptName": promptName,
            "contentName": contentName
          }
        }
      }
    }
  
    static contentStartAudio(promptName, contentName, audioInputConfig = S2sEvent.DEFAULT_AUDIO_INPUT_CONFIG) {
      return {
        "event": {
          "contentStart": {
            "promptName": promptName,
            "contentName": contentName,
            "type": "AUDIO",
            "interactive": true,
            "role": "USER",
            "audioInputConfiguration": {
              "mediaType": "audio/lpcm",
              "sampleRateHertz": 16000,
              "sampleSizeBits": 16,
              "channelCount": 1,
              "audioType": "SPEECH",
              "encoding": "base64"
            }
          }
        }
      }
    }
  
    static audioInput(promptName, contentName, content) {
      return {
        event: {
          audioInput: {
            promptName,
            contentName,
            content,
          }
        }
      };
    }
  
    static contentStartTool(promptName, contentName, toolUseId) {
      return {
        event: {
          contentStart: {
            promptName,
            contentName,
            interactive: false,
            type: "TOOL",
            toolResultInputConfiguration: {
              toolUseId,
              type: "TEXT",
              textInputConfiguration: { mediaType: "text/plain" }
            }
          }
        }
      };
    }
  
    static textInputTool(promptName, contentName, content) {
      return {
        event: {
          textInput: {
            promptName,
            contentName,
            content,
            role: "TOOL"
          }
        }
      };
    }
  
    static promptEnd(promptName) {
      return {
        event: {
          promptEnd: {
            promptName
          }
        }
      };
    }
  
    static sessionEnd() {
      return { event: { sessionEnd: {} } };
    }
  }
  export default S2sEvent;