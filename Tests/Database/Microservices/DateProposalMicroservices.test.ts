// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import DateProposalsMs from '../../../src/Database/Microservices/Dates/DateProposalsMs';

const DateProposals = new DateProposalsMs();

chai.use(chaiHttp);
chai.should();
describe("DateProposalMicroservices", () => {
    describe("GET /", () => {
        // // Test to get all students record
        // it("should get all students record", (done) => {
        //     // DateProposals.ApplyForDateProposal()
        // });
        // // Test to get single student record
        // it("should get a single student record", (done) => {
        //     const id = 1;
        //     chai.request(app)
        //         .get(`/${id}`)
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             res.body.should.be.a('object');
        //             done();
        //         });
        // });
    });
});
