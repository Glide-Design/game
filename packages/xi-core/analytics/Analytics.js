import axios from 'axios';

class Analytics {
  initialized = false;

  recordBatch = [];
  recordBatchBufferTimeout = 3000;
  recordDispatchTimer = null;

  endPoint = null;
  streamName = null;

  bufferLibrary = null;

  registerReceiver({ streamName, endPoint, bufferLibrary }) {
    this.endPoint = endPoint;
    this.streamName = streamName;
    this.bufferLibrary = bufferLibrary;
    this.initialized = true;
  }

  track({ eventName, data, platform }) {
    if (this.initialized) {
      this.recordBatch.push({
        Data: this.bufferLibrary
          .from(JSON.stringify({ eventName, data, platform }))
          .toString('base64'),
      });

      if (!this.recordDispatchTimer) {
        this.recordDispatchTimer = setTimeout(async () => {
          if (this.recordBatch.length) {
            const Records = this.recordBatch.slice(0);
            this.recordBatch = [];
            try {
              await axios.post(this.endPoint, {
                DeliveryStreamName: this.streamName,
                Records,
              });
            } catch (err) {
              console.log(err);
              this.recordBatch = Records.concat(this.recordBatch);
            }
          }
          this.recordDispatchTimer = null;
        }, this.recordBatchBufferTimeout);
      }
    }
  }
}

export default new Analytics();
